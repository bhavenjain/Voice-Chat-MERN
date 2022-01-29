const otpService = require('../../services/authentication/otp-service')
const hashService = require('../../services/authentication/hash-service')
const userService = require('../../services/user/user-services')
const tokenService = require('../../services/user/token-service')
const UserDto = require('../../dtos/user-dtos')

class AuthController {
  // Send OTP
  async sendOtp (req, res) {
    const { phone } = req.body
    // Bad Request
    if (!phone) {
      res.status(400).json({ message: 'Phone field in required' })
    }
    // Generate the Otp
    const otp = await otpService.generateOtp()
    // Hash the otp
    const ttl = 1000 * 60 * 2
    const expires = Date.now() + ttl
    const Data = `${phone}.${otp}.${expires}`
    const hash = hashService.hashOtp(Data)

    // Send Otp to phone
    try {
      // await otpService.sendBySms(phone, otp)
      return res.json({
        hash: `${hash}.${expires}`,
        phone,
        otp
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Otp sending failure' })
    }
  }

  // Verify OTP
  async verifyOtp (req, res) {
    const { phone, hash, otp } = req.body

    if (!phone || !otp || !hash) {
      res.status(400).json({ message: 'All fields are required.' })
    }

    // Hash details
    const [hashedOtp, expires] = hash.split('.')

    // Expire check
    if (Date.now() > +expires) {
      res.status(400).json({ message: 'OTP Expired' })
    }

    // Otp Check
    const Data = `${phone}.${otp}.${expires}`
    const isValid = otpService.verifyOtp(hashedOtp, Data)

    if (!isValid) {
      res.status(400).json({ message: 'Invalid OTP' })
    }

    let user
    try {
      user = await userService.findUser({ phone })
      if (!user) {
        user = await userService.createUser({ phone })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'DB Error' })
    }

    try {
      // Token

      const { accessToken, refreshToken } = tokenService.generateToken({
        _id: user._id,
        activated: false
      })

      await tokenService.storeFreshToken(refreshToken, user._id)

      res.cookie('refreshtoken', refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true
      })

      res.cookie('accesstoken', accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true
      })
    } catch (error) {
      res.status(500).json({ message: 'Token Error' })
    }

    const userDto = new UserDto(user)
    res.json({ user: userDto, auth: true })
  }

  // Refresh Tokens
  async refresh (req, res) {
    // Get token from cookie
    const { refreshtoken: refreshTokenCookie } = req.cookies

    // Check Validity
    let userData
    try {
      userData = await tokenService.verifyRefreshToken(refreshTokenCookie)
    } catch (error) {
      return res.status(401).json({ message: `Invalid Token` })
    }

    // Check if token in db
    try {
      const token = await tokenService.findRefreshToken(
        userData._id,
        refreshTokenCookie
      )
      if (!token) {
        return res.status(401).json({ message: 'Invalid Token1' })
      }
    } catch (error) {
      return res.status(500).json({ message: 'Internal Error' })
    }

    // Check for user validity
    const user = await userService.findUser({ _id: userData._id })
    if (!user) {
      return res.status(404).json({ message: 'No user found' })
    }

    // Generate new tokens for users
    const { refreshToken, accessToken } = tokenService.generateToken({
      _id: userData._id
    })

    // Update Refresh token
    try {
      await tokenService.updateRefreshToken(userData._id, refreshToken)
    } catch (error) {
      return res.status(500).json({ message: 'Internal Error' })
    }

    // store cookies
    res.cookie('refreshtoken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true
    })

    res.cookie('accesstoken', accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true
    })

    // Response
    const userDto = new UserDto(user)
    res.json({ user: userDto, auth: true })
  }

  // Logout
  async logout (req, res) {
    const { refreshtoken: refreshToken } = req.cookies
    await tokenService.removeToken(refreshToken)
    res.clearCookie('refreshToken')
    res.clearCookie('accessToken')
    res.json({ user: null, auth: false })
  }
}

module.exports = new AuthController()
