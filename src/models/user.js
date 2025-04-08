const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Importar bcrypt
const userSchema = new mongoose.Schema({ 
  userId: String,
  username: String,
  password: String,
  role : String,
  email: String,
  storeId: String,
});
// Middleware para encriptar la contraseña antes de guardar
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10); // Generar salt
    this.password = await bcrypt.hash(this.password, salt); // Hashear la contraseña
  }
  next();
});
module.exports = mongoose.model('User', userSchema);