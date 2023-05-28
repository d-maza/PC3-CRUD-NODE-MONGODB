const personaje = require("../models/personajes.js");
const Crud = require("./crud.service");

const crudPersonajes = new Crud(personaje);

const servicePersonajes = {
  ...crudPersonajes,
  buscar_humanos() {
    return this.model.find({ especie: "Humano" });
  },
  afiliacion_Sith() {
    return this.model.find({ afiliacion: /Sith/ });
  },
  planetaNatal_Tattooine() {
    return this.model.find({ planeta_natal: "Tatooine" });
  },
};

module.exports = servicePersonajes;
