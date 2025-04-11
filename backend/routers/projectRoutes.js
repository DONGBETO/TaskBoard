const express = require('express');
const router = express.Router();
const { getUserTasks } = require('../controllers/tasksController');
const { protect } = require('../middlewares/auth');

router.get('/', protect, getUserTasks);

module.exports = router;
