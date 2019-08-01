const express = require('express')
const userAuth = require('../middleware/authUser').userAuthentication
const alreadyLogin = require('../middleware/authUser').userAlreadyLogin
const router = express.Router()

const UserController = require('../controllers/user-controller');
const RepairmanController = require('../controllers/repairman-controller');

router.get('/:username/verify', UserController.verificationEmail)
router.get('/logout', UserController.logout)

router.get('/register', alreadyLogin, UserController.showRegisterPage);
router.post('/register', UserController.registerUser);

router.get('/login', alreadyLogin, UserController.showLoginPage);
router.post('/login', UserController.loginUser);

router.get('/:username/dashboard', userAuth, UserController.showDashboard);
router.get('/:username/edit', userAuth, UserController.showEditForm);
router.post('/:username/edit', userAuth, UserController.updateUser);

// router.get('/testInput', UserController.registerUser)
// router.post('/testInput2', UserController.giveRating)

router.get('/:username/repairman', RepairmanController.findAll);
router.post('/:username/repairman', UserController.bookRepairman);
// router.post('/:username/repairman', (req, res) => {
//   res.send(req.body)
// });

module.exports = router