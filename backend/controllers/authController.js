const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const path = require('path');

// Schéma de validation avec Joi pour l'inscription
const Joi = require('joi');
const registerSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.min': 'Le nom doit contenir au moins 3 caractères.',
    'any.required': 'Le nom est obligatoire.'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'L\'email est invalide.',
    'any.required': 'L\'email est obligatoire.'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Le mot de passe doit contenir au moins 6 caractères.',
    'any.required': 'Le mot de passe est obligatoire.'
  }),
  role: Joi.string().valid('admin', 'responsable', 'member').required().messages({
    'any.required': 'Le rôle est obligatoire.',
    'any.only': 'Le rôle doit être parmi "admin", "responsable" ou "member".'
  })
});

// Route spécifique pour afficher la page d'inscription
exports.getDashboard = (req, res) => {
  res.render("../views/dashboard");
}

// Route spécifique pour afficher la page d'inscription
exports.getRegister = (req, res) => {
  res.sendFile(path.join(__dirname, "../../views/publics","register.html"));
}
// Route spécifique pour afficher la page de connexion
exports.getLogin = (req, res) => {
  res.sendFile(path.join(__dirname, "../../views/publics","login.html"));
}


// Inscription

exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  // console.log("Requête reçue avec body :", req.body); // 👈 Ajoute ça pour voir le contenu


  // Validation avec Joi
  const { error } = registerSchema.validate({ name, email, password, role });

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) {
       return res.status(409).json({ 
        success: false,
        field: email,
        message: 'Utilisateur déjà existant' });
    }

    // Créer l'utilisateur avec le rôle choisi par l'utilisateur et isValidated à false
    const newUser = new User({
      name,
      email,
      password,
      role,  // L'utilisateur choisit son rôle
      isValidated: false  // L'utilisateur est non validé par défaut
    });

    // Sauvegarder l'utilisateur
    await newUser.save();
    return res.status(201).json({
       message: 'Inscription réussie et en attente de validation par un administrateur.' 
      });

    // .status(400).json({ : 'Erreur lors de l\'inscription' });


    // // Générer un token JWT
    // const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur lors de l\'inscription' });
  }
};

// Connexion

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Utilisateur non trouvé' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' });

    // Vérifier si l'utilisateur est validé
    if (!user.isValidated) {
      return res.status(403).json({ message: 'Votre rôle est en attente de validation par un administrateur.' });
    }

    // Générer un token JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '5h' });

    // Envoi du token et des informations de l'utilisateur dans la réponse
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, 
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion' });
  }
};


// // Validation du rôle par l'admin
// exports.validateUserRole = async (req, res) => {
//   const { userId } = req.params;

//   // Vérifier si l'utilisateur est un admin
//   // if (req.user.role !== 'admin') {
//   //   return res.status(403).json({ message: 'Vous n\'avez pas les droits pour valider un utilisateur.' });
//   // }

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'Utilisateur non trouvé' });
//     }

//     // Vérifier si l'utilisateur est déjà validé
//     if (user.isValidated) {
//       return res.status(400).json({ message: 'Cet utilisateur est déjà validé' });
//     }

//     // Valider l'utilisateur et mettre à jour son rôle
//     user.isValidated = true;
//     await user.save();

//     res.json({ message: `Utilisateur ${user.name} validé avec succès.` });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Erreur lors de la validation du rôle de l\'utilisateur' });
//   }
// };
