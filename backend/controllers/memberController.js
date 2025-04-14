const Task = require('../models/Tasks');
const Project = require('../models/Projects');
const User = require('../models/Users');



exports.getTasksForMember = async (req, res) => {
    const userId = req.user.id;  // ID de l'utilisateur connecté (c'est-à-dire le membre)
  
    try {
      const tasks = await Task.find({ assignedTo: userId })
        .populate('project', 'title')  // Récupérer les informations du projet associé à la tâche
        .populate('assignedTo', 'name');  // Récupérer les informations des utilisateurs assignés
  
      if (!tasks.length) {
        return res.status(404).json({ message: 'Aucune tâche assignée' });
      }
  
      res.status(200).json(tasks);
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches assignées :', error);
      res.status(500).json({ message: 'Erreur serveur lors de la récupération des tâches' });
    }
  };
  


exports.updateTaskStatus = async (req, res) => {
    const { id } = req.params;  // L'ID de la tâche
    const { status } = req.body;  // Nouveau statut
  
    try {
      const task = await Task.findById(id);  // Trouver la tâche par son ID
  
      if (!task) {
        return res.status(404).json({ message: 'Tâche non trouvée' });
      }
  
      // Vérifier que la tâche est bien assignée à l'utilisateur connecté
      if (!task.assignedTo.includes(req.user.id)) {
        return res.status(403).json({ message: 'Accès interdit : vous ne pouvez pas modifier cette tâche' });
      }
  
      // Mettre à jour le statut de la tâche
      task.status = status || task.status;
      await task.save();
  
      res.status(200).json({ message: 'Statut de la tâche mis à jour avec succès' });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de la tâche :', error);
      res.status(500).json({ message: 'Erreur serveur lors de la mise à jour du statut de la tâche' });
    }
  };
  