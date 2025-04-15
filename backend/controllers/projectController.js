const Projects = require('../models/Projects');
const Team = require('../models/Team');
const User = require('../models/Users');

// Créer un projet
exports.createProject = async (req, res) => {
  const { title, description, startDate, endDate, teamId, teamName, teamMembers } = req.body;

  try {
    let team;

    // Si aucune équipe n'est donnée, créer une nouvelle équipe
    if (!teamId) {
      // Créer une nouvelle équipe avec les membres spécifiés, en incluant le responsable
      team = new Team({
        name: teamName,
        members: [...teamMembers, req.user.id]  // Ajouter le responsable dans l'équipe
      });

      // Sauvegarder l'équipe dans la base de données
      await team.save();
    } else {
      // Si une équipe existe déjà, récupérer cette équipe
      team = await Team.findById(teamId);
      if (!team) {
        return res.status(404).json({ message: 'Équipe non trouvée' });
      }
    }

    // Créer un projet et associer l'équipe
    const newProject = new Projects({
      title,
      description,
      startDate,
      endDate,
      createdBy: req.user.id, // L'utilisateur responsable du projet
      team: team._id // L'ID de l'équipe
    });

    // Sauvegarder le projet dans la base de données
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.error('Erreur création projet :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


// Récupérer tous les projets
exports.getProjects = async (req, res) => {
  try {
    const projects = await Projects.find().populate('team');
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des projets' });
  }
};


// Obtenir un projet par ID
exports.getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Projects.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du projet' });
  }
};

// Mettre à jour un projet
exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, startDate, endDate, team } = req.body;

  try {
    const project = await Projects.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }

    project.title = title || project.title;
    project.description = description || project.description;
    project.startDate = startDate || project.startDate;
    project.endDate = endDate || project.endDate;
    project.team = team || project.team;

    await project.save();
    res.status(200).json({ message: 'Projet mis à jour avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du projet' });
  }
};

// Supprimer un projet
exports.deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Projects.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }

    await project.deleteOne();
    res.status(200).json({ message: 'Projet supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du projet' });
  }
};
