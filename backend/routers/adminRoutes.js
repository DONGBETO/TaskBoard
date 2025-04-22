const express = require('express');
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/adminController'); // Correction des imports
const { validateUserRole, getValidationsUser, getValidatedUsers} = require('../controllers/adminController');  // Importation de la fonction validateUserRole
const authenticate = require('../middlewares/auth'); 
const checkRole = require('../middlewares/role'); 

const router = express.Router();

router.get('/validations', getValidationsUser);
router.get('/invitations-validated', getValidatedUsers);
router.post('/users', authenticate, checkRole('admin'), createUser);
router.get('/users', authenticate, checkRole('admin'), getUsers);
router.get('/users/:id', authenticate, checkRole('admin'), getUserById);
router.put('/users/:id', authenticate, checkRole('admin'), updateUser);
router.delete('/users/:id', authenticate, checkRole('admin'), deleteUser);

// validation utilisateur
router.put('/validate-user/:userId', authenticate, checkRole('admin'), validateUserRole);

module.exports = router;