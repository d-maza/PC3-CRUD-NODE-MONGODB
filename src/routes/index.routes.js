const express = require("express");
const router = express.Router();
const path = require('path');

// Schema Mongoose & db Name
let db = "Star_Wars";
const peliculas = require("./models/peliculas");
const personajes = require("./models/personajes");

// RUTAS
const getAll = (path.join(__dirname, "../views/pages/getAll"));
const getAll2 = (path.join(__dirname, "../views/pages/getAll2"));

const add = (path.join(__dirname, "../views/pages/add"));
const add2 = (path.join(__dirname, "../views/pages/add2"));

const OnePeli = (path.join(__dirname, "../views/pages/OnePeli"));
const OnePersonajes = (path.join(__dirname, "../views/pages/OnePersonajes"));




// GET -API- for view all
router.get("/API/getAll", async (req, res) => {
  try {
    let arrayPeliculasDB = await peliculas.find();
    res.render(getAll, {
      arrayPeliculas: arrayPeliculasDB,
    });
  } catch (error) {
    console.log(error);
  }
});

// GET -API- for view all2
router.get("/API/getAll2", async (req, res) => {
  try {
    let arrayPersonajesDB = await personajes.find();
    res.render(getAll2, {
      arrayPersonajes: arrayPersonajesDB,
    });
  } catch (error) {
    console.log(error);
  }
});

// GET API/add
router.get("/API/add", (req, res) => {
  res.render(add);
});

// GET API/add2
router.get("/API/add2", (req, res) => {
  res.render(add2);
});

// POST API/Add2
router.post("/API/add2", async (req, res) => {
  const body = req.body;
  // console.log(body);
  // res.send('Datos enviados corectamente')
  res.redirect("/API/getAll2");
  try {
    await personajes.create(body);
  } catch (error) {
    console.log("error", error);
  }
});

// POST API/Add
router.post("/API/add", async (req, res) => {
  const body = req.body;
  // console.log(body);
  // res.send('Datos enviados corectamente')
  res.redirect("/API/getAll");
  try {
    await peliculas.create(body);
  } catch (error) {
    console.log("error", error);
  }
});

// GET - OnePeli
router.get("/API/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const peliculasDB = await peliculas.findOne({ _id: id });
    // console.log(peliculasDB);
    res.render(OnePeli, {
      pelicula: peliculasDB,
      error: false,
    });
  } catch (error) {
    console.log(error);
    res.render(OnePeli, {
      error: true,
      mensaje: "No se encuentra el Id seleccionado",
    });
  }
});

// GET - OnePersonaje
router.get("/api2/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const personajesDB = await personajes.findOne({ _id: id });
    // console.log(peliculasDB);
    res.render(OnePersonajes, {
      personaje: personajesDB,
      error: false,
    });
  } catch (error) {
    console.log(error);
    res.render(OnePersonajes, {
      error: true,
      mensaje: "No se encuentra el Id seleccionado",
    });
  }
});

// Rute de: Busca todos los humanos
router.get("/API/Busqueda/1", async (req, res) => {
  try {
    let arrayPersonajesDB = await personajes.find({ especie: "Humano" });
    res.render(getAll2, {
      arrayPersonajes: arrayPersonajesDB,
    });
    // console.log(arrayPersonajesDB);
  } catch (error) {
    console.log(error);
  }
});

// Ruta de: Busca todos los sith.
router.get("/API/Busqueda/2", async (req, res) => {
  try {
    const arrayPersonajesDB = await personajes.find({ afiliacion: /Sith/ });
    res.render(getAll2, {
      arrayPersonajes: arrayPersonajesDB,
    });
    // console.log(arrayPersonajesDB);
  } catch (error) {
    console.log(error);
  }
});

// Ruta de: Busca los nacidos en Tatooine
router.get("/API/Busqueda/3", async (req, res) => {
  try {
    const arrayPersonajesDB = await personajes.find({
      planeta_natal: "Tatooine",
    });
    res.render(getAll2, {
      arrayPersonajes: arrayPersonajesDB,
    });
    //  console.log(arrayPersonajesDB);
  } catch (error) {
    console.log(error);
  }
});

// Busca las películas cuyo director es George Lucas
router.get("/API/Busqueda/4", async (req, res) => {
  try {
    const arrayPeliculasDB = await peliculas.find({ Director: "George Lucas" });
    // console.log(arrayPeliculasDB);
    res.render(getAll, {
      arrayPeliculas: arrayPeliculasDB,
    });
  } catch (error) {
    console.log(error);
  }
});

// DELETE => API/GetAll
router.delete("/API/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const peliculasDB = await peliculas.findByIdAndDelete({ _id: id });

    if (peliculasDB) {
      res.json({
        estado: true,
        mensaje: "Eliminado",
      });
    } else {
      res.json({
        estado: false,
        mensaje: "No se puede eliminar",
      });
    }
  } catch (error) {
    console.log("error");
  }
});

// DELETE Personaje
router.delete("/api2/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const personajeDB = await personajes.findByIdAndDelete({ _id: id });

    if (personajeDB) {
      res.json({
        estado: true,
        mensaje: "Eliminado",
      });
    } else {
      res.json({
        estado: false,
        mensaje: "No se puede eliminar",
      });
    }
  } catch (error) {
    console.log("error");
  }
});

module.exports = router;
