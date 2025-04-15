const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ['en cours', 'terminée', 'bloquée'],
    default: 'en cours'
  },
  priority: {
    type: String,
    enum: ['basse', 'moyenne', 'haute'],
    default: 'moyenne'
  },

  // Lien vers le projet parent
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },

  // Affectation à un ou plusieurs membres
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }]
}, {
  timestamps: true
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
