const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }, // L'utilisateur qui a créé le projet

  // Référence à une équipe, une équipe existante ou une nouvelle équipe créée à la volée
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
}, {
  timestamps: true
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
