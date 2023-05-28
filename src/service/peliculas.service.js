const pelicula = require("../models/peliculas.js");
const Crud = require("./crud.service");

const crudPeliculas = new Crud(pelicula);

const servicePeliculas = {
  ...crudPeliculas,
  director_GLucas() {
    return this.model.find({ Director: "George Lucas" });
  },
};

module.exports = servicePeliculas;
