const servicePeliculas = require('../service/peliculas.service.js')
const { ensureFound, renderPage } = require("./controller.utils");

const pelisCtrl = {}

pelisCtrl.getAllPelis = async (req, res) => {
  const arrayPeliculas = await servicePeliculas.getAll();

  return renderPage(res, "../views/pages/getAllPelis", {
    arrayPeliculas,
  });
}

pelisCtrl.getEditPeli = async (req, res) => {
  const pelicula = ensureFound(
    await servicePeliculas.getById(req.params.id),
    'Pelicula no encontrada'
  );

  return renderPage(res, "../views/pages/OnePeli", {
    pelicula,
  });
}

pelisCtrl.getAddPelis = async (req, res) => {
  return renderPage(res, "../views/pages/addPeli");
}

pelisCtrl.add_peli = async (req, res) => {
  await servicePeliculas.add(req.body)

  return res.redirect('/API/getAllPelis');
}

pelisCtrl.editPeli = async (req, res) => {
  ensureFound(
    await servicePeliculas.editById(req.params.id, req.body),
    'Pelicula no encontrada'
  );

  return res.redirect('/API/getAllPelis');
}

pelisCtrl.deletePeli = async (req, res) => {
  ensureFound(
    await servicePeliculas.delete(req.params.id),
    'Pelicula no encontrada'
  );

  return res.status(200).json({
    mensaje: 'Eliminado correctamente',
  });
}

pelisCtrl.Ejercicio4 =async (req, res) => {
  const arrayPeliculas = await servicePeliculas.director_GLucas()

  return renderPage(res, '../views/pages/getAllPelis', {
    arrayPeliculas,
  });
};

module.exports = pelisCtrl

