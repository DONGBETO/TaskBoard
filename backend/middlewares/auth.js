const jwt = require('jsonwebtoken');
const User = require('../models/Users');  // Modèle User

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];  // Récupère le token depuis le header

  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé, veuillez vous connecter.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);  // Récupère l'utilisateur associé au token
    if (!req.user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé.' });
    }
    next();  // L'utilisateur est authentifié, on passe à la prochaine fonction middleware
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide ou expiré.' });
  }
};

module.exports = authenticate;
