'use strict';

const mongoose = require('mongoose');

// Defino el esquema que daré a los anuncios de la tienda

const anuncioSchema = mongoose.Schema({
  nombre: {type: String, required: true},
  venta: {type: Boolean, required: true},
  precio: {type: Number, required: true},
  foto: {type: String},
  tags: {type: [String], required: true}
});


// Métodos estáticos

anuncioSchema.statics.listar = function(filtro, skip, limit, sort, fields) {
  const query = Anuncio.find(filtro); // no lo ejecuto: devuelve un objeto query sin más
  query.skip(skip);
  query.limit(limit); 
  query.sort(sort);
  query.select(fields);
  return query.exec(); // al ejecutarlo, devuelve la promesa
}

// Creo el modelo de anuncio y lo exporto

const Anuncio = mongoose.model('Anuncio', anuncioSchema);
module.exports = Anuncio;