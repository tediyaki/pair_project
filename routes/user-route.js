const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user-controller')

router.get('/register', UserController.showRegisterPage)
router.post('/register', UserController.registerUser)

router.get('/login', UserController.showLoginPage)
router.post('/login', UserController.loginUser)

router.get('/:username/history', UserController.showHistory)

router.get('/:username/edit', UserController.showEditForm)
router.post('/:username/edit', UserController.updateUser)

router.get('/testInput', UserController.bookRepairman)
router.get('/testInput2', UserController.giveRating)

module.exports = router