const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'done'],
    default: 'todo'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: { type: Date },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Projects', required: true }
}, {
  timestamps: true
});

const Tasks = mongoose.model('Tasks', tasksSchema);
module.exports = Tasks;
