const pelicula = require("../models/peliculas.js");

exports.get_peliculas = () => {
  return pelicula.find();
};

exports.delete_pelicuala = (id) => {
  return pelicula.findByIdAndDelete(id);
};

exports.add_peliculas = (body) => {
  const pelicula = new pelicula(body);
  return pelicula.create(pelicula);
};

exports.get_pelicula = (id) => {
  return pelicula.findOne({ _id: id });
};

exports.edit_peliculas = (id, body) => {
  return pelicula.findByIdAndUpdate(id, body);
};

exports.directos_GLucas = () => {
  return peliculas.find({ Director: "George Lucas" });
};
