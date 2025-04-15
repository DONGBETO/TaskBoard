const express = require('express');
const router = express.Router();
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
} = require('../controllers/projectController');

const authenticate = require('../middlewares/auth');
const checkRole = require('../middlewares/role');

// Routes pour le responsable de projet
router.post('/projects', authenticate, checkRole('responsable'), createProject);
router.get('/projects', authenticate, checkRole('responsable'), getProjects);
router.get('/projects/:id', authenticate, checkRole('responsable'), getProjectById);
router.put('/projects/:id', authenticate, checkRole('responsable'), updateProject);
router.delete('/projects/:id', authenticate, checkRole('responsable'), deleteProject);

module.exports = router;
