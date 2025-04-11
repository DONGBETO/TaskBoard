const { required } = require('joi');
const mongoose = require('mongoose');
const { isDate } = require('validator');

const projectSchema = new mongoose.Schema({
   title: { type: String, required: true },
   description: { type: String },
   startDate:{ type:Date, required: true },
   endDate:{ type: String,required: true },
   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },

   team: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
});

const Projects = mongoose.model('Projects', projectSchema);
module.exports = Projects;
