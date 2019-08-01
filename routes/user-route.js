const express = require('express')
const router = express.Router();

router.use(['/register', '/login', '/:username/dashboard', '/:username/edit', '/:username/del/:transaction_id', '/:username/repairman'], express.static('public'));
const userAuth = require('../middleware/authUser').userAuthentication;
const alreadyLogin = require('../middleware/authUser').userAlreadyLogin;

const UserController = require('../controllers/user-controller');
const RepairmanController = require('../controllers/repairman-controller');

router.get('/:username/verify/:token', UserController.verificationEmail)
router.get('/logout', UserController.logout)

router.get('/register', alreadyLogin, UserController.showRegisterPage);
router.post('/register', UserController.registerUser);

router.get('/login', alreadyLogin, UserController.showLoginPage);
router.post('/login', UserController.loginUser);

router.get('/:username/dashboard', UserController.showDashboard);

router.get('/:username/edit', userAuth, UserController.showEditForm);
router.post('/:username/edit', UserController.updateUser);

router.get('/:username/del/:transaction_id', UserController.deleteHistory);
router.post('/:username/dashboard/', UserController.giveRating)

router.get('/:username/dashboard', userAuth, UserController.showDashboard);
router.post('/:username/edit', userAuth, UserController.updateUser);

// router.get('/testInput', UserController.registerUser)

router.get('/:username/repairman', RepairmanController.findAll);
router.post('/:username/repairman', UserController.bookRepairman);

module.exports = router