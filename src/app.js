const express = require("express");
const app = express();                        // Express

const bodyParser = require("body-parser");    // bodyParser
const mongoose = require("mongoose")          // Mongoose

require('dotenv').config()                    // Variables de entono HEROKU

const path = require("path");                 // Rutas relativas (Linux, Wndows, Mac)
const { Console } = require("console");

app.set("view engine", "ejs");                // Renderizado ejs

let port = process.env.PORT || 3000;          // Puerto asignado



//  parse application/json && /x-www-form-urlencoded &&
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection MONGODB Cluster
const user = "david"
const password = "w08bsQx75MlhiT9N"
const dbName = "StarWars"

const uri = `mongodb+srv://${user}:${password}@cluster0.qmiyj.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('Conectado a mongodb')) 
  .catch(e => console.log('error de conexión', e))

  // CONECXION LOCAL 

// mongoose.connect("mongodb://localhost:27017/Star_Wars", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const connection = mongoose.connection;

// connection.once("open", () => {
//   console.log("Conexión a la BD exitosa");
// });

// connection.on("error", (err) => {
//   console.log("Error en la conexión a la BD: ", err);
// });

// Starting
app.get("/", (req, res) => {
  res.render(path.join(__dirname, "views/pages/index"));
});
// console.log(path.join(__dirname, "views/page/index"))




// Static files (Web)
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.use(require(path.join(__dirname,"./routes/index.routes")));

// console.log(path.join(__dirname, "./routes/index.routes"));

// 404
// app.use((req, res) => {
//   res.sendFile(path.join(__dirname, "../public/404.html"));
// });


// New 404 Renderizada
app.use((req, res, next) => {
  res.status(404).render(path.join(__dirname, "./views/pages/404"))
});

// Levantado el puerto (port)
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

