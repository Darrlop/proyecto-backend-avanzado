'use strict';
const mongoose = require('mongoose');

// Establezo manejadores de eventos principales 

mongoose.connection.on('error', (err) => {
  console.log('Error en la conexión a la base de datos -> ', err);
});

mongoose.connection.once('open', () => {
  const conex = mongoose.connection.name;
  console.log ('Conectado a MongoDB -> base de datos:', conex);
});

// Establezco la conexión con la  y exporto

mongoose.connect('mongodb://127.0.0.1:27017/nodepopDB');
module.exports = mongoose.connection;