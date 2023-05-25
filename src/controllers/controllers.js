const personajes = require('../models/personajes.js');
const peliculas = require('../models/peliculas.js');
const path = require("path");

const StarWarsCtrl = {}

// Mostar todas la colección Peliculas
StarWarsCtrl.getAllPelis = async (_req, res) => {
  try {
    const arrayPeliculas = await peliculas.find();
    res.render(path.join(__dirname, "../views/pages/getAllPelis"), {
      arrayPeliculas
    });
  } catch (error) {
    console.log(error);
  }
};

// Mostrar todas los Personajes
StarWarsCtrl.getAllPersoanjes = async (req, res) => {
  try {
    const arrayPersonajes = await personajes.find();
    res.render(path.join(__dirname, "../views/pages/getAllPersonajes"), {
      arrayPersonajes
    });
  } catch (error) {
    console.log(error);
  }
};


StarWarsCtrl.getPeli = (req, res) => {
  res.render(path.join(__dirname,"../views/pages/add2"));
};

StarWarsCtrl.addPeli = async (req, res) => {
  const body = req.body;
  res.redirect(path.join(__dirname,"../views/pages/add2"));
  try {
    await peliculas.create(body);
  } catch (error) {
    console.log("error", error);
  }
};
 
// StarWarsCtrl.AddPersonaje = (req, res) => {
//   res.render(path.join(__dirname,"../views/pages/add"));
// };

// StarWarsCtrl.AñadirPersonaje = async (req, res) => {
//   const body = req.body;
//   res.redirect(path.join(__dirname,"../views/pages/add"));
//   try {
//     await personajes.create(body);
//   } catch (error) {
//     console.log("error", error);
//   }
// };
// NUEVO EDITAR
StarWarsCtrl.editPeli =  async  ( req ,  res )  =>  {
  const id = req.params.id;
  res.redirect("/API/getAll");
  try {
    await peliculas.updateOne({ _id: id }, req.body);
  } catch (error) {
    console.log.apply(error)
  }
};

// StarWarsCtrl.editPersonaje = async  ( req ,  res )  =>  {
//   const id = req.params.id;
//   res.redirect("/API/getAll2");
//   try {
//     await personajes.updateOne({ _id: id }, req.body);
//   } catch (error) {
//     console.log.apply(error)
//   }
// };


// DELETE => api peliculas
StarWarsCtrl.deletePeli = async (req, res) => {
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
};


// Ejercicio 1
StarWarsCtrl.Ejercicio1 = async (_req, res) => {
  try {
    const arrayPersonajes = await personajes.find({ especie: "Humano" });
    console.log(arrayPersonajes);
    res.render(path.join(__dirname,"../views/pages/getAll2"), {
      arrayPersonajes
    });
  } catch (error) {
    console.log(error);
  }
};

//  Ejercicio 2.
StarWarsCtrl.Ejercicio2 = async (_req, res) => {
  try {
    const arrayPersonajes = await personajes.find({ afiliacion: /Sith/ });
    res.render(path.join(__dirname,"../views/pages/getAll2"), {
      arrayPersonajes
    });
  } catch (error) {
    console.log(error);
  }
};

//  Ejercicio 3.
StarWarsCtrl.Ejercicio3 = async (_req, res) => {
  try {
    const arrayPersonajes = await personajes.find({
      planeta_natal: "Tatooine",
    });
    res.render(path.join(__dirname,"../views/pages/getAll2"), {
      arrayPersonajes
    });
  } catch (error) {
    console.log(error);
  }
};

// Ejercicio 4
StarWarsCtrl.Ejercicio4 = async (_req, res) => {
  try {
    const arrayPeliculas = await peliculas.find({ Director: "George Lucas" });
    res.render(path.join(__dirname,"../views/pages/getAll"), {
      arrayPeliculas,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = StarWarsCtrl
