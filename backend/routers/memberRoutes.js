const express = require('express');
const router = express.Router();
const {
  getTasksForMember,
  updateTaskStatus
} = require('../controllers/memberController');

const authenticate = require('../middlewares/auth');
const checkRole = require('../middlewares/role');

// Route pour obtenir les tâches assignées à un membre
router.get('/tasks/member', authenticate, checkRole('membre'), getTasksForMember);

// Route pour mettre à jour le statut d'une tâche
router.put('/tasks/:id/status', authenticate, checkRole('membre'), updateTaskStatus);

module.exports = router;
