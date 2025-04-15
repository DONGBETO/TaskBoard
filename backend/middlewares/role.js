const checkRole = (roles) => {
  return (req, res, next) => {
    // Vérifie si l'utilisateur est authentifié et si son rôle est autorisé
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Accès refusé, vous n\'avez pas les droits.' });
    }
    next();  // Si l'utilisateur a les droits, on passe à la fonction suivante
  };
};

module.exports = checkRole;
