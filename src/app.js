const express = require("express");
const app = express();                        // Express

const bodyParser = require("body-parser");    // bodyParser.
const mongoose = require("mongoose")          // Mongoose.

const path = require("path");                 // Rutas relativas => Ruta absoluta.
require('dotenv').config()                    // Variables de entono HEROKU.


app.set('views', './views/pages/');           // Renderizado ejs.
app.set("view engine", "ejs");                
let port = process.env.PORT || 3000;          // Puerto asignado.

//  Procesa .json el body y formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection MONGODB Cluster
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.qmiyj.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('Conectado a mongodb')) 
  .catch(e => console.log('error de conexión', e))


// Starting
app.get("/", (req, res) => {
  res.render(path.join(__dirname, "views/pages/index"));
});

// Routes
app.use(require(path.join(__dirname, "./routes/index.routes")));

// Static files (Web)
app.use(express.static(path.join(__dirname, "../public")));


// New 404 Renderizada
app.use((req, res, next) => {
  res.status(404).render(path.join(__dirname, "./views/pages/404"))
});

// Levantado el puerto (port)
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

