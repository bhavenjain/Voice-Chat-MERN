const jwt = require('jsonwebtoken')
const RefreshModel = require('../../models/refreshModel')

// Secrets
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET

class TokenService {
  // Generate new tokens
  generateToken (payload) {
    // Access Token
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: '1h'
    })
    // Refresh Token
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: '1y'
    })

    return { accessToken, refreshToken }
  }

  // Store fresh token
  async storeFreshToken (token, userId) {
    try {
      await RefreshModel.create({
        token,
        userId
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  // Verify the access token
  async verifyAccessToken (token) {
    return jwt.verify(token, accessTokenSecret)
  }

  // Verify the refresh token
  async verifyRefreshToken (token) {
    return jwt.verify(token, refreshTokenSecret)
  }

  // Find token in db
  async findRefreshToken (userId, refreshToken) {
    return await RefreshModel.findOne({
      userId: userId,
      token: refreshToken
    })
  }

  // Update refresh token
  async updateRefreshToken (userId, token) {
    return await RefreshModel.updateOne({ userId: userId }, { token: token })
  }

  async removeToken (refreshToken) {
    return await RefreshModel.deleteOne({ token: refreshToken })
  }
}

module.exports = new TokenService()
