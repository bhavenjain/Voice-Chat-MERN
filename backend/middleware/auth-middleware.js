const tokenService = require('../services/user/token-service')

module.exports = async function (req, res, next) {
  try {
    // Access token from cookie
    const { accesstoken } = req.cookies
    if (!accesstoken) {
      throw new Error()
    }

    // Verify token
    const userData = await tokenService.verifyAccessToken(accesstoken)
    if (!userData) {
      throw new Error()
    }

    req.user = userData

    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: 'Invalid Token' })
  }
}
