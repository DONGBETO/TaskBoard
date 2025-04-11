const Projects = require('../models/Projects');

exports.createProject = async (req, res) => {
  const { title, description, startDate, endDate, team } = req.body;

  try {
    const newProject = new Projects({
      title,
      description,
      startDate,
      endDate,
      createdBy: req.user.id, // dépend du middleware d'auth
      team
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.error('Erreur création projet :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
