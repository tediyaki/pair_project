const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user-controller');
const RepairmanController = require('../controllers/repairman-controller');

router.get('/register', UserController.showRegisterPage);
router.post('/register', UserController.registerUser);

router.get('/login', UserController.showLoginPage);
router.post('/login', UserController.loginUser);


router.get('/:username/dashboard', UserController.showDashboard);
router.get('/:username/edit', UserController.showEditForm);
router.post('/:username/edit', UserController.updateUser);

// router.get('/testInput', UserController.registerUser)
// router.post('/testInput2', UserController.giveRating)


router.get('/:username/repairman', RepairmanController.findAll);
router.post('/:username/repairman', UserController.bookRepairman);
// router.post('/:username/repairman', (req, res) => {
//   res.send(req.body)
// });

module.exports = router