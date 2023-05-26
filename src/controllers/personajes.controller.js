const personajesService = require('../service/personajes.service.js')
const path = require("path");

const personajesCtrl = {}

personajesCtrl.get_personajes = async (req, res) => {
  try {
    const arrayPersonajes = await personajesService.get_personajes();
    res.status(200)
      .render(path.join(__dirname, '../views/pages/getAllPersonajes'), ({
        arrayPersonajes: arrayPersonajes
      }));
  } catch (error) {
    res.status(500).send(error.message);
  }
};

personajesCtrl.getAddPersonaje = async (req, res) => {
  try {
    res.render(path.join(__dirname, "../views/pages/addPersonaje"));
  } catch (error) {
    console.error(error);
  }  
}
personajesCtrl.getEditPersonaje = async (req, res) => {
  try {
    const id = req.params.id
    const personaje= await personajesService.get_personaje(id)
    res.render(path.join(__dirname, "../views/pages/onePersonajes"), ({
     personaje
    }));
  } catch (error) {
    console.error(error);
  }
}
personajesCtrl.delete_personaje = async (req, res) => {
  try {
    let user = await personajesService.delete_personaje(req.params.id);
    res.json(
      {
        mensaje: '🔥 Eliminado correctamente 🔥',
      },

    ).status(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

personajesCtrl.add_personaje = async (req, res) => {
  try {
    let user = await personajesService.add_personaje(req.body);
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

personajesCtrl.get_personaje = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await personajesService.get_personaje({ _id: id });
    res.status(200).send(user);
  } catch (error) {
    res.end(error.message).status(204);
  }
};

personajesCtrl.edit_personaje = async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  try {
    await personajesService.edit_personaje(id, body);
    res.status(201).json({
      mensaje: "Editado correctamente 👌🏼",
      data: body,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Ejercicio 1
personajesCtrl.Ejercicio1 = async (req, res) => {
  try {
    const arrayPersonajes = await personajesService.buscar_humanos()
    res.status(200)
      .render(path.join(__dirname, '../views/pages/getAllPersonajes'), ({
        arrayPersonajes: arrayPersonajes
      }));
  } catch (error) {
    console.log(error);
  }
};

personajesCtrl.Ejercicio2 = async (req, res) => {
  try {
    const arrayPersonajes = await personajesService.afiliacion_Sith()
    res.status(200)
      .render(path.join(__dirname, '../views/pages/getAllPersonajes'), ({
        arrayPersonajes: arrayPersonajes
      }));
  } catch (error) {
    console.log(error);
  }
};
personajesCtrl.Ejercicio3 = async (req, res) => {
  try {
    const arrayPersonajes = await personajesService.planetaNatal_Tattooine()
    res.status(200)
      .render(path.join(__dirname, '../views/pages/getAllPersonajes'), ({
        arrayPersonajes: arrayPersonajes
      }));
  } catch (error) {
    console.log(error);
  }
};

module.exports = personajesCtrl
