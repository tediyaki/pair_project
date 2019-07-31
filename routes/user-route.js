const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user-controller')

router.get('/register', UserController.showRegisterPage)
router.post('/register', UserController.registerUser)

router.get('/login', UserController.showLoginPage)
router.post('/login', UserController.loginUser)

// router.get('/history', UserController)
router.get('/testInput', UserController.registerUser)

module.exports = router