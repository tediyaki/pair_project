const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user-controller');
const RepairmanController = require('../controllers/repairman-controller');

router.get('/register', UserController.showRegisterPage);
router.post('/register', UserController.registerUser);

router.get('/login', UserController.showLoginPage);
router.post('/login', UserController.loginUser);


// router.get('/testInput', UserController.findAVG);
router.get('/:username/dashboard', UserController.showHistory);
router.get('/:username/edit', UserController.showEditForm);
router.post('/:username/edit', UserController.updateUser);
// router.get('/:username/dashboard', UserController.dashboard);


// >>>>>>>>>>>>>>>>>> Repairman
router.get('/:username/repairman', RepairmanController.findAll);
router.post('/:username/repairman', (req, res) => {
  res.send(req.body);
});


router.get('/testInput', UserController.bookRepairman);
router.get('/testInput2', UserController.giveRating);

module.exports = router;