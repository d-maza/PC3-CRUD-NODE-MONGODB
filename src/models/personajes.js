const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personajeSchema = new Schema({
  nombre: String,
  especie: String,
  afiliacion: String,
  planeta_natal: String,
  nacimiento: String,
});

// Crear el modelo
const personaje = mongoose.model("personaje", personajeSchema);

module.exports = personaje;
