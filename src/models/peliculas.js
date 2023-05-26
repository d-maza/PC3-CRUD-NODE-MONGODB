const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const peliculaSchema = new Schema({
  Titulo:  String,
  Director: String,
  Estreno: String,
  Presupuesto: String,
  Cronología : String,
});

// Crear el modelo
const pelicula = mongoose.model('pelicula', peliculaSchema);

module.exports = pelicula;