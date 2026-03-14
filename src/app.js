const express = require("express");
const app = express();

const mongoose = require("mongoose")
const { seedInitialData } = require("./seed/seed-data");

const path = require("path");
require('dotenv').config()

const {
  MONGO_URI,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_DBNAME,
  MONGO_HOST = 'localhost',
  MONGO_PORT = '27017',
  SEED_ON_STARTUP = 'true',
} = process.env;

if (!MONGO_URI && !MONGO_DBNAME) {
  console.error('🔴 Falta MONGO_DBNAME (o define MONGO_URI completo).');
  process.exit(1);
}

app.set('views', './views/pages/');
app.set("view engine", "ejs");
let port = process.env.PORT || 3000;

//  Procesa .json el body y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const hasCredentials = Boolean(MONGO_USER && MONGO_PASSWORD);
const uriWithAuth = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}?authSource=admin`;
const uriWithoutAuth = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}`;
const shouldSeedOnStartup = String(SEED_ON_STARTUP).toLowerCase() === 'true';

const connectMongo = async () => {
  if (MONGO_URI) {
    try {
      await mongoose.connect(MONGO_URI);
      console.log('🟢 Mongo conectado a:', mongoose.connection.name);
      return true;
    } catch (error) {
      console.log('🔴 error de conexión', error);
      return false;
    }
  }

  try {
    const firstUri = hasCredentials ? uriWithAuth : uriWithoutAuth;
    await mongoose.connect(firstUri);
    console.log('🟢 Mongo conectado a:', mongoose.connection.name);
    return true;
  } catch (error) {
    // Si estás en local y las credenciales no aplican, reintenta sin auth.
    if (hasCredentials && error?.codeName === 'AuthenticationFailed') {
      try {
        console.log('🟡 Auth falló; reintentando conexión sin credenciales...');
        await mongoose.connect(uriWithoutAuth);
        console.log('🟢 Mongo conectado a:', mongoose.connection.name);
        return true;
      } catch (retryError) {
        console.log('🔴 error de conexión', retryError);
        return false;
      }
    }

    console.log('🔴 error de conexión', error);
    return false;
  }
};

connectMongo()
  .then(async (connected) => {
    if (!connected) {
      return;
    }

    if (shouldSeedOnStartup) {
      try {
        await seedInitialData();
      } catch (seedError) {
        console.error('🔴 Error cargando semillas:', seedError);
      }
    }
  })
  .catch((error) => {
    console.error('🔴 Error inesperado al inicializar Mongo:', error);
  });

app.get("/", (req, res) => {
  res.render(path.join(__dirname, "views/pages/index"));
  
});


app.use(require(path.join(__dirname, "./routes/index.routes")));


app.use((req, res, next) => {
  res.status(404).render(path.join(__dirname, "./views/pages/404"))
});

// Middleware de error centralizado
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;

  console.error(err.stack);
  res.status(statusCode).send(err.message || 'Error interno del servidor');
});

app.listen(port, () => {
  console.log(`🌐 Server listening at http://localhost:${port}`);
});

