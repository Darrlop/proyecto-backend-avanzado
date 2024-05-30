const mongoose = require('mongoose');

//Schema
const usuarioSchema = mongoose.Schema({
  email: {type: String, unique: true}, // unique en vez de index para que sea índice único
  password: {type: String}
});

//Modelo de Usuario
const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;