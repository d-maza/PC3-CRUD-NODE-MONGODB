const express = require("express");
const router = express.Router();
const starWarsCtrl = require('../controllers/controllers')


router.get("/API/peli/getAllPelis", starWarsCtrl.getAllPelis);
router.get("/API/peli/getPeli", starWarsCtrl.getPeli);
router.post("/API/peli/addPeli", starWarsCtrl.addPeli);
router.put("/API/peli/edit/:id", starWarsCtrl.editPeli);
router.delete("/API/peli/delete/:id", starWarsCtrl.deletePeli);

router.get("/API/peli/getAllPersonajes", starWarsCtrl.getAllPersoanjes);
// router.get("/API/add", starWarsCtrl.AddPersonaje);
// router.post("/API/add", starWarsCtrl.AñadirPersonaje);
// router.put("/api4/:id", starWarsCtrl.editPersonaje);
// router.delete("/API/:id", starWarsCtrl.deletePelicula);



router.get("/API/Busqueda/1", starWarsCtrl.Ejercicio1);
router.get("/API/Busqueda/2", starWarsCtrl.Ejercicio2);
router.get("/API/Busqueda/3", starWarsCtrl.Ejercicio3);
router.get("/API/Busqueda/4", starWarsCtrl.Ejercicio4);


module.exports = router;
