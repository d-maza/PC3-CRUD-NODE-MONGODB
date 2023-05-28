const servicePeliculas = require('../service/peliculas.service.js')
const path = require("path");

pelisCtrl = {}

pelisCtrl.getAllPelis = async (req, res) => {
  try {

    const arrayPeliculas = await servicePeliculas.getAll();
    res.status(200)
      .render(path.join(__dirname, "../views/pages/getAllPelis"), ({
        arrayPeliculas
      }));
  } catch (error) {
    console.error(error);
  }
  
}

pelisCtrl.getEditPeli = async (req, res) => {
  try {
    const id = req.params.id
    const [pelicula]= await servicePeliculas.getById(id)
    res.render(path.join(__dirname, "../views/pages/onePeli"), ({
     pelicula
    }));
  } catch (error) {
    console.error(error);
  }
}

pelisCtrl.getAddPelis = async (req, res) => {
  try {
    res.render(path.join(__dirname, "../views/pages/addPeli"));
  } catch (error) {
    console.error(error);
  }  
}

pelisCtrl.add_peli = async (req, res) => {
  const body = req.body
  await servicePeliculas.add(body)
  try {
    res.redirect('/API/getAllPelis');
  } catch (error) {
    console.error(error);
  }  
}

pelisCtrl.editPeli = async (req, res) => {
  const id = req.params.id
  const body = req.body
 await servicePeliculas.editById(id ,body)
  try {
    res.redirect('/API/getAllPelis');
  } catch (error) {
    console.error(error);
  }  
}

pelisCtrl.deletePeli = async (req, res) => {
  const id = req.params.id
 
  try {
    await servicePeliculas.delete(id)
    res.json(
      {
        mensaje: 'Eliminado correctamente',
      },

    ).status(200);
  } catch (error) {
    console.error(error);
  }  
}

pelisCtrl.Ejercicio4 =async (req, res) => {
  try {
    const arrayPeliculas = await servicePeliculas.director_GLucas()
    res.status(200)  
    .render(path.join(__dirname, '../views/pages/getAllPelis'), ({
      arrayPeliculas
  }));
  } catch (error) {
    console.log(error);
  }
};

module.exports = pelisCtrl

