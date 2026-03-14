const Pelicula = require("../models/peliculas");
const Personaje = require("../models/personajes");

const peliculasSeed = [
  {
    Titulo: "A New Hope",
    Director: "George Lucas",
    Estreno: "1977",
    Presupuesto: "11000000",
    Cronologia: "IV",
    "Cronología": "IV",
  },
  {
    Titulo: "The Empire Strikes Back",
    Director: "Irvin Kershner",
    Estreno: "1980",
    Presupuesto: "18000000",
    Cronologia: "V",
    "Cronología": "V",
  },
  {
    Titulo: "Return of the Jedi",
    Director: "Richard Marquand",
    Estreno: "1983",
    Presupuesto: "32500000",
    Cronologia: "VI",
    "Cronología": "VI",
  },
];

const personajesSeed = [
  {
    nombre: "Luke Skywalker",
    especie: "Humano",
    afiliacion: "Alianza Rebelde",
    planeta_natal: "Tatooine",
    nacimiento: "19 BBY",
  },
  {
    nombre: "Darth Vader",
    especie: "Humano",
    afiliacion: "Sith",
    planeta_natal: "Tatooine",
    nacimiento: "41.9 BBY",
  },
  {
    nombre: "Yoda",
    especie: "Desconocida",
    afiliacion: "Jedi",
    planeta_natal: "Desconocido",
    nacimiento: "896 BBY",
  },
];

const seedInitialData = async () => {
  const [peliculasCount, personajesCount] = await Promise.all([
    Pelicula.countDocuments(),
    Personaje.countDocuments(),
  ]);

  if (peliculasCount === 0) {
    await Pelicula.insertMany(peliculasSeed);
    console.log("🌱 Semillas cargadas en peliculas");
  }

  if (personajesCount === 0) {
    await Personaje.insertMany(personajesSeed);
    console.log("🌱 Semillas cargadas en personajes");
  }

  if (peliculasCount > 0 && personajesCount > 0) {
    console.log("🌱 Semillas omitidas: colecciones ya tienen datos");
  }
};

module.exports = {
  seedInitialData,
};
