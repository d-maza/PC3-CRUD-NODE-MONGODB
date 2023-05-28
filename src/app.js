const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const mongoose = require("mongoose")

const path = require("path");
require('dotenv').config()

app.set('views', './views/pages/');
app.set("view engine", "ejs");
let port = process.env.PORT || 3000;

//  Procesa .json el body y formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.qmiyj.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`

mongoose.connect(uri)
  .then((db) => console.log('🟢 Mongo conectado a:', db.connection.name))
  .catch(e => console.log('🔴 error de conexión', e))

app.get("/", (req, res) => {
  res.render(path.join(__dirname, "views/pages/index"));
  
});


app.use(require(path.join(__dirname, "./routes/index.routes")));


app.use((req, res, next) => {
  res.status(404).render(path.join(__dirname, "./views/pages/404"))
});


app.listen(port, () => {
  console.log(`🌐 Server listening at http://localhost:${port}`);
});

