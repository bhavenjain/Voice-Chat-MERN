const router = require('express').Router()
const authentication = require('../controllers/authentication/Authentication')
const activateController = require('../controllers/Activate/activateController')
const roomsController = require('../controllers/rooms/rooms')
const authMiddleware = require('../middleware/auth-middleware')

// Routes Get Requests
router.get('/api/refresh', authentication.refresh)
router.get('/api/rooms', authMiddleware, roomsController.index)

// POST Requests
router.post('/api/send-otp', authentication.sendOtp)
router.post('/api/verify-otp', authentication.verifyOtp)
router.post('/api/activate', authMiddleware, activateController.activate)
router.post('/api/logout', authMiddleware, authentication.logout)
router.post('/api/rooms', authMiddleware, roomsController.create)

module.exports = router
