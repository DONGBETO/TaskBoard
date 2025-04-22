const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Schéma utilisateur
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['admin', 'responsable', 'member',], 
    default: 'member' 
  },
  isValidated: { type: Boolean, default: false },  // L'utilisateur est non validé par défaut
});

// Middleware pour le hachage du mot de passe avant la sauvegarde
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Méthode pour comparer le mot de passe haché
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Users', userSchema);
