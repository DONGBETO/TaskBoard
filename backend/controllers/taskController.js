const Task = require('../models/Tasks');
const Project = require('../models/Projects');
const User = require('../models/Users');

// Créer une tâche
exports.createTask = async (req, res) => {
  const { title, description, status, priority, project, assignedTo } = req.body;

  try {
    // Vérifier si le projet existe
    const projectExists = await Project.findById(project);
    if (!projectExists) {
      return res.status(400).json({ message: 'Projet non trouvé' });
    }

    // Vérifier si tous les membres existent
    const users = await User.find({ '_id': { $in: assignedTo } });
    if (users.length !== assignedTo.length) {
      return res.status(400).json({ message: 'Un ou plusieurs membres n\'existent pas' });
    }

    // Créer la tâche
    const newTask = new Task({
      title,
      description,
      status,
      priority,
      project,
      assignedTo
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Erreur lors de la création de la tâche :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la création de la tâche' });
  }
};

// Obtenir toutes les tâches d'un projet
exports.getTasksByProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const tasks = await Task.find({ project: projectId }).populate('assignedTo', 'name email').populate('project', 'title');
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des tâches' });
  }
};

// Modifier une tâche
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, priority, assignedTo } = req.body;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.priority = priority || task.priority;
    task.assignedTo = assignedTo || task.assignedTo;

    await task.save();
    res.status(200).json({ message: 'Tâche mise à jour avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la tâche' });
  }
};

// Supprimer une tâche
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    await task.deleteOne();
    res.status(200).json({ message: 'Tâche supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la tâche' });
  }
};

// Obtenir toutes les tâches d'un projet avec pagination et filtres
exports.getTasksByProject = async (req, res) => {
  const { projectId } = req.params;
  const { page = 1, limit = 10, status, priority, startDate, endDate } = req.query;

  try {
    // Validation du projet
    const projectExists = await Project.findById(projectId);
    if (!projectExists) {
      return res.status(400).json({ message: 'Projet non trouvé' });
    }

    // Construction de l'objet de filtre
    const filters = { project: projectId };

    if (status) filters.status = status;
    if (priority) filters.priority = priority;
    if (startDate) filters.createdAt = { $gte: new Date(startDate) };
    if (endDate) filters.createdAt = { $lte: new Date(endDate) };

    // Pagination avec Mongoose : skip et limit
    const tasks = await Task.find(filters)
      .skip((page - 1) * limit)  // Pagination : calculer l'offset
      .limit(parseInt(limit))    // Limiter le nombre d'éléments
      .sort({ createdAt: -1 })   // Trier par date de création descendante


    // Compter le nombre total de tâches pour pagination
    const totalTasks = await Task.countDocuments(filters);

    res.status(200).json({
      tasks,
      totalTasks,
      totalPages: Math.ceil(totalTasks / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des tâches' });
  }
};
