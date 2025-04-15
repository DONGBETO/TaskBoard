const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask
} = require('../controllers/taskController'); 

const authenticate = require('../middlewares/auth');
const checkRole = require('../middlewares/role');

// Routes pour gérer les tâches
router.post('/tasks', authenticate, checkRole('responsable'), createTask); // Créer une tâche
router.get('/tasks/project/:projectId', authenticate, checkRole('responsable'), getTasksByProject); // Obtenir les tâches par projet avec pagination et filtres 
router.put('/tasks/:id', authenticate, checkRole('responsable'), updateTask); // Modifier une tâche
router.delete('/tasks/:id', authenticate, checkRole('responsable'), deleteTask); // Supprimer une tâche

module.exports = router;
