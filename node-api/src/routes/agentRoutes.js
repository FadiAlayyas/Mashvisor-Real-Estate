const express = require('express');
const router = express.Router();
const controller = require('../controllers/agentController');

router.get('/stats/active-agents', controller.getStats);

module.exports = router;
