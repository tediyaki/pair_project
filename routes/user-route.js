const express = require('express')
const router = express.Router();

router.use(['/register', '/login', '/:username/dashboard', '/:username/edit', '/:username/del/:transaction_id', '/:username/repairman'], express.static('public'));

const UserController = require('../controllers/user-controller');
const RepairmanController = require('../controllers/repairman-controller');

router.get('/register', UserController.showRegisterPage);
router.post('/register', UserController.registerUser);

router.get('/login', UserController.showLoginPage);
router.post('/login', UserController.loginUser);

router.get('/:username/dashboard', UserController.showDashboard);
router.get('/:username/edit', UserController.showEditForm);
router.post('/:username/edit', UserController.updateUser);
router.get('/:username/del/:transaction_id', UserController.deleteHistory);
router.post('/:username/dashboard/', UserController.giveRating)
// router.post('/:username/dashboard/', (req, res) => {
  // res.send(req.body);
// })

// router.get('/testInput', UserController.registerUser)

router.get('/:username/repairman', RepairmanController.findAll);
router.post('/:username/repairman', UserController.bookRepairman);
// router.post('/:username/repairman', (req, res) => {
//   res.send(req.body)
// });

module.exports = router