const express = require("express");
const router = express.Router();
const personajesCtrl = require('../controllers/personajes.controller')
const pelisCtrl = require('../controllers/pelis.controlller')

// Vistas
router.get("/API/getAllPelis", pelisCtrl.getAllPelis);
router.get("/API/getAllPersonajes", personajesCtrl.get_personajes);
router.get("/API/getAddPeli", pelisCtrl.getAddPelis);
router.get("/API/getAddPersonaje", personajesCtrl.getAddPersonaje);

//Eñadir Editar Eliminar 
router.get("/API/getEditPeli/:id", pelisCtrl.getEditPeli );
router.get("/API/getEditPersonaje/:id", personajesCtrl.getEditPersonaje);

// Buquedas Ejeccio
router.get("/API/Busqueda/1", personajesCtrl.Ejercicio1);
router.get("/API/Busqueda/2", personajesCtrl.Ejercicio2);
router.get("/API/Busqueda/3", personajesCtrl.Ejercicio3);
router.get("/API/Busqueda/4", pelisCtrl.Ejercicio4);

module.exports = router;


// router.get("/API/peli/addPeli", starWarsCtrl.getAddPeli);
// router.post("/API/peli/addPeli", starWarsCtrl.postAddPeli);
// router.put("/API/peli/edit/:id", starWarsCtrl.editPeli);
// // router.put("/API/peli/edit/:id", starWarsCtrl.editPeli);
// router.delete("/API/peli/delete/:id", starWarsCtrl.deletePeli);

// router.get("/API/persoanje/addPersonaje", starWarsCtrl.addPersonaje);
// router.post("/API/add", starWarsCtrl.AñadirPersonaje);
// router.put("/api4/:id", starWarsCtrl.editPersonaje);
// router.delete("/API/:id", starWarsCtrl.deletePelicula);


