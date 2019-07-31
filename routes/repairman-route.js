const express = require('express');
const router = express.Router();
const repairman = require('../controllers/repairman-controller');

router.get('/', repairman.findAll);

module.exports = router;