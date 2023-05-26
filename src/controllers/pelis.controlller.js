const pelisService = require('../service/peliculas.service.js')
const path = require("path");

const pelisCtrl = {}

pelisCtrl.getAllPelis = async (req, res) => {
  try {

    const arrayPeliculas = await pelisService.get_peliculas();

    res.status(200)
      .render(path.join(__dirname, "../views/pages/getAllPelis"), ({
        arrayPeliculas
      }));
  } catch (error) {
    console.error(error);
  }
  
}

pelisCtrl.Ejercicio4 =async (req, res) => {
  try {
    const arrayPeliculas = await pelisService.directos_GLucas()
    res.status(200)  
    .render(path.join(__dirname, '../views/pages/getAllPelis'), ({
      arrayPeliculas
  }));
  } catch (error) {
    console.log(error);
  }
};

module.exports = pelisCtrl

// StarWarsCtrl.getAllPersoanjes = async (req, res) => {
//     try {
//       const arraypelicuals = await pelicuals.find();
//       res.render(path.join(__dirname, "../views/pages/getAllpelicuals"), {
//         arraypelicuals
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
  
  
//   StarWarsCtrl.getAddPeli = (req, res) => {
    
//     res.render(path.join(__dirname,"../views/pages/addPeli"));
//   };
  
//   StarWarsCtrl.postAddPeli = async (req, res) => {
//     const body = req.body;
//     try {
//       await peliculas.create(body);
//       res. ("/API/peli/getAllPelis");
//     } catch (error) {
//       console.log("error", error);
//     }
//   };
   
//   StarWarsCtrl.getAddPersonaje = (req, res) => {
//     res.render('../views/pages/');
//   };
  
//   // StarWarsCtrl.AñadirPersonaje = async (req, res) => {
//   //   const body = req.body;
//   //   res.redirect(path.join(__dirname,"../views/pages/add"));
//   //   try {
//   //     await pelicuals.create(body);
//   //   } catch (error) {
//   //     console.log("error", error);
//   //   }
//   // };
//   // NUEVO EDITAR
//   StarWarsCtrl.editPeli =  async  ( req ,  res )  =>  {
//     const id = req.params.id;
//     res.redirect(path.join(__dirname,"../views/pages/onePelis"));
//     try {
//       await peliculas.updateOne({ _id: id }, req.body);
//     } catch (error) {
//       console.log.apply(error)
//     }
//   };
  
//   StarWarsCtrl.editPersonaje = async  ( req ,  res )  =>  {
//     const id = req.params.id;
//     res.redirect("/API/getAll2");
//     try {
//       await pelicuals.updateOne({ _id: id }, req.body);
//     } catch (error) {
//       console.log.apply(error)
//     }
//   };
  
  
//   // DELETE => api peliculas
//   StarWarsCtrl.deletePeli = async (req, res) => {
//     const id = req.params.id;
//     try {
//       const peliculasDB = await peliculas.findByIdAndDelete({ _id: id });
  
//       if (peliculasDB) {
//         res.json({
//           estado: true,
//           mensaje: "Eliminado",
//         });
//       } else {
//         res.json({
//           estado: false,
//           mensaje: "No se puede eliminar",
//         });
//       }
//     } catch (error) {
//       console.log("error");
//     }
//   };
  
  
//   // Ejercicio 1
//   StarWarsCtrl.Ejercicio1 = async (_req, res) => {
//     try {
//       const arraypelicuals = await pelicuals.find({ especie: "Humano" });
  
//       res.render(path.join(__dirname,"../views/pages/getAllpelicuals"), {
//         arraypelicuals
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
  
//   //  Ejercicio 2.
//   StarWarsCtrl.Ejercicio2 = async (_req, res) => {
//     try {
//       const arraypelicuals = await pelicuals.find({ afiliacion: /Sith/ });
//       res.render(path.join(__dirname,"../views/pages/getAllpelicuals"), {
//         arraypelicuals
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
  
//   //  Ejercicio 3.
//   StarWarsCtrl.Ejercicio3 = async (_req, res) => {
//     try {
//       const arraypelicuals = await pelicuals.find({
//         planeta_natal: "Tatooine",
//       });
//       res.render(path.join(__dirname,"../views/pages/getAllpelicuals"), {
//         arraypelicuals
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
  
//   // Ejercicio 4
//   StarWarsCtrl.Ejercicio4 = async (_req, res) => {
//     try {
//       const arrayPeliculas = await peliculas.find({ Director: "George Lucas" });
//       res.render(path.join(__dirname,"../views/pages/getAllPelis"), {
//         arrayPeliculas,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };