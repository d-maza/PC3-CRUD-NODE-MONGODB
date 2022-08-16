const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const peliculasSchema = new Schema({
  Titulo:  String,
  Director: String,
  Año_estreno: String,
  Presupuesto: String,
  Cronología : String,
});

// Crear el modelo
const peliculas = mongoose.model('peliculas', peliculasSchema);

module.exports = peliculas;