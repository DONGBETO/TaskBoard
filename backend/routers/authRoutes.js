const express = require('express');
const { registerUser, loginUser, validateUserRole } = require('../controllers/authController');
const router = express.Router();

// Route d'inscription
router.post('/register', registerUser);

// Route de connexion
router.post('/login', loginUser);

// Route pour que l'admin valide un utilisateur
router.post('/validate-user', validateUserRole);

module.exports = router;
