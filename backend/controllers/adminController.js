const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const sendEmail = require('../models/sendEmails');



// Validation du rôle par l'admin
exports.validateUserRole = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    if (user.isValidated) {
      return res.status(400).json({ message: 'Cet utilisateur est déjà validé' });
    }

    user.isValidated = true;
    await user.save();

    // ✅ Envoi d'un e-mail de notification
    await sendEmail({
      to: user.email,
      subject: `TASK MANAGER`,
      text: `Bonjour ${user.name},\n\nVotre compte a été validé par un administrateur. Vous pouvez maintenant vous connecter à la plateforme. http://localhost:8080/api/auth/login
      \n\nCordialement,\nL'équipe Task Manager`
    });

    res.json({ message: `Utilisateur ${user.name} validé avec succès. Un e-mail a été envoyé.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la validation du rôle de l\'utilisateur' });
  }
};


// Créer un utilisateur
exports.createUser = async (req, res) => {
    const { name, email, password, role } = req.body;
  
    try {
      // Vérifier si l'utilisateur existe déjà
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'Utilisateur déjà existant' });
      }
  
      // Créer un nouveau user
      const newUser = new User({ name, email, password, role });
      await newUser.save();
  
      res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur' });
    }
  };
  
  // Lister tous les utilisateurs
  exports.getUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
    }
  };
  
  // Récupérer un utilisateur par son ID
  exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur' });
    }
  };
  
  // Modifier un utilisateur
  exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role } = req.body;
  
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
  
      // Mettre à jour les informations
      user.name = name || user.name;
      user.email = email || user.email;
      user.password = password || user.password;
      user.role = role || user.role;
  
      await user.save();
      res.status(200).json({ message: 'Utilisateur mis à jour avec succès' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur' });
    }
  };
  
  // Supprimer un utilisateur
  exports.deleteUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
  
      await user.deleteOne();
      res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur' });
    }
  };
