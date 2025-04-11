const Tasks = require('../models/Tasks');

exports.getUserTasks = async (req, res) => {
  const { page = 1, limit = 10, status, priority, dueDate } = req.query;

  const filters = { assignedTo: req.user.id };
  if (status) filters.status = status;
  if (priority) filters.priority = priority;
  if (dueDate) filters.dueDate = { $lte: new Date(dueDate) };

  try {
    const tasks = await Tasks.find(filters)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ dueDate: 1 });

    res.json(tasks);
  } catch (error) {
    console.error('Erreur liste tâches :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
