const express = require("express");
const router = express.Router();
const personajesCtrl = require('../controllers/personajes.controller')
const pelisCtrl = require('../controllers/pelis.controlller')

// Vistas
router.get("/API/getAllPelis", pelisCtrl.getAllPelis);
router.get("/API/getAllPersonajes", personajesCtrl.get_personajes);
router.get("/API/getAddPeli", pelisCtrl.getAddPelis);
router.get("/API/getAddPersonaje", personajesCtrl.getAddPersonaje);
router.get("/API/getEditPeli/:id", pelisCtrl.getEditPeli );
router.get("/API/getEditPersonaje/:id", personajesCtrl.getEditPersonaje);

//Eñadir Editar Eliminar
router.post("/API/personaje/add", personajesCtrl.add_personaje);
router.post("/API/personaje/edit/:id", personajesCtrl.edit_personaje);
router.delete("/API/personaje/:id", personajesCtrl.delete_personaje);

router.post("/API/peli/add", pelisCtrl.add_peli);
router.post("/API/peli/edit/:id", pelisCtrl.editPeli)
router.delete("/API/peli/:id", pelisCtrl.deletePeli);



// Buquedas Ejeccio
router.get("/API/Busqueda/1", personajesCtrl.Ejercicio1);
router.get("/API/Busqueda/2", personajesCtrl.Ejercicio2);
router.get("/API/Busqueda/3", personajesCtrl.Ejercicio3);
router.get("/API/Busqueda/4", pelisCtrl.Ejercicio4);

module.exports = router;






