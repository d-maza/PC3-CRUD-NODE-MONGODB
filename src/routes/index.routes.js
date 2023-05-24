const express = require("express");
const router = express.Router();
const starWarsCtrl = require('../controllers/controllers')
const path = require("path");


router.get("/API/getAll", starWarsCtrl.MostrarPelis);
router.get("/API/getAll2", starWarsCtrl.MostraPersonajes);


router.get("/API/add2", (req, res) => {
  res.render(path.join(__dirname,"../views/pages/add2"));
});
router.get("/API/add", (req, res) => {
    res.render(path.join(__dirname,"../views/pages/add"));
  });

router.get("/API/Busqueda/1", starWarsCtrl.Ejercicio1);
router.get("/API/Busqueda/2", starWarsCtrl.Ejercicio2);
router.get("/API/Busqueda/3", starWarsCtrl.Ejercicio3);
router.get("/API/Busqueda/4", starWarsCtrl.Ejercicio4);


module.exports = router;
