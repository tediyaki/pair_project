const express = require('express');
const router = express.Router();
const repairman = require('../controllers/repairman-controller');

router.use(['/:username/dashboard', '/:username/edit', '/:username/del/:transaction_id', '/:username/home'], express.static('public'));

// router.get('/register', repairman.showRegisterPage);
// router.post('/register', repairman.registerRepairman);

// router.get('/login', repairman.showLoginPage);
// router.post('/login', repairman.loginRepairman);

router.get('/:username/dashboard', repairman.showDashboard);

module.exports = router;