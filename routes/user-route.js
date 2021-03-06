const express = require('express')
const router = express.Router();

router.use(['/register', '/login/', '/:username/dashboard', '/:username/edit', '/:username/del/:transaction_id', '/:username/home'], express.static('public'));

const userAuth = require('../middleware/authUser').userAuthentication;
const alreadyLogin = require('../middleware/authUser').userAlreadyLogin;

const UserController = require('../controllers/user-controller');
const RepairmanController = require('../controllers/repairman-controller');

router.get('/logout', UserController.logout);
router.get('/:username/verify/:token', userAuth, UserController.verificationEmail);

// router.get('/register', alreadyLogin, UserController.showRegisterPage);


router.get('/login', alreadyLogin, UserController.showLoginPage);
router.post('/login', UserController.loginUser);
router.post('/register', UserController.registerUser);

router.get('/:username/dashboard', userAuth, UserController.showDashboard);

router.get('/:username/edit', userAuth, UserController.showEditForm);
router.post('/:username/edit', UserController.updateUser);

router.get('/:username/del/:transaction_id', userAuth, UserController.deleteHistory);
router.post('/:username/dashboard', UserController.giveRating)

router.get('/:username/dashboard', userAuth, UserController.showDashboard);
router.post('/:username/edit', userAuth, UserController.updateUser);

// router.get('/testInput', UserController.registerUser)

router.get('/:username/home', userAuth, RepairmanController.findAll);
router.post('/:username/home', UserController.bookRepairman);

module.exports = router