const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Schema
const usuarioSchema = mongoose.Schema({
  email: {type: String, unique: true}, // unique en vez de index para que sea índice único
  password: {type: String}
});


// método estático que aplica hash sobre una contraseña
usuarioSchema.statics.hashPassword = function(passwordVisible) {
  return bcrypt.hash(passwordVisible, 6); //indico un salt rounds bajo para primar la velocidad
}

// método de instancia que compara un password introducido con el  encriptado de un usuario
usuarioSchema.methods.comparePassword = function(passwordVisible) {
  return bcrypt.compare(passwordVisible, this.password);
}




//Modelo de Usuario
const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;