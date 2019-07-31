const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user-controller');
const RepairmanController = require('../controllers/repairman-controller');

router.get('/register', UserController.showRegisterPage);
router.post('/register', UserController.registerUser);

router.get('/login', UserController.showLoginPage);
router.post('/login', UserController.loginUser);

// router.get('/history', UserController)
router.get('/testInput', UserController.showHistory);
router.get('/:username/history', UserController.showHistory);
router.get('/:username/edit', UserController.showEditForm);
router.post('/:username/edit', UserController.updateUser);
router.get('/testInput', UserController.findAVG);

// >>>>>>>>>>>>>>>>>> Repairman controller
router.get('/:username/repairman', RepairmanController.findAll);

router.post('/', (req, res) => {
  res.send(req.body);
});

router.get('/:username/history', UserController.showHistory)

router.get('/:username/edit', UserController.showEditForm)
router.post('/:username/edit', UserController.updateUser)

router.get('/testInput', UserController.findAVG)


module.exports = router