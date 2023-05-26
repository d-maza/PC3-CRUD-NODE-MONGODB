const personaje = require('../models/personajes.js');

exports.get_personajes = () => {
  return  personaje.find();
};

exports.delete_personaje =  (id) => {
  return  personaje.findByIdAndDelete(id);
};

exports.add_personaje =  (body) => {
  const personaje = new personaje(body);
  return  personaje.create(personaje);
};

exports.get_personaje =  (id) => {
  return personaje.findOne({ _id: id });
};

exports.edit_personaje =  (id, body) => {
  return  personaje.findByIdAndUpdate(id, body);
};

exports.buscar_humanos =  () => {
  return  personaje.find({ especie: "Humano" });
};
exports.afiliacion_Sith =  () => {
  return  personaje.find({ afiliacion: /Sith/ });
};
exports.planetaNatal_Tattooine =  () => {
  return  personaje.find({ planeta_natal: "Tatooine" });
};
