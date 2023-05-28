const personajesService = require('../service/personajes.service.js')
const { request, response } = require('express')

const path = require("path");

const personajesCtrl = {}

personajesCtrl.get_personajes = async (request, response) => {
  try {
    const arrayPersonajes = await personajesService.getAll();
    
    response.status(200)
      .render(path.join(__dirname, '../views/pages/getAllPersonajes'), ({
        arrayPersonajes: arrayPersonajes
      }));
  } catch (error) {
    res.status(500).send(error.message);
  }
};

personajesCtrl.getAddPersonaje = async (request, response) => {
  try {
    response.render(path.join(__dirname, "../views/pages/addPersonaje"));
  } catch (error) {
    console.error(error);
  }  
}
personajesCtrl.getEditPersonaje = async (request, response) => {
  try {
    const id = request.params.id
    const [personaje] = await personajesService.getById(id)
    // console.log(personaje);
    response.render(path.join(__dirname, "../views/pages/onePersonajes"), ({
     personaje
    }));
  } catch (error) {
    console.error(error);
  }
}
personajesCtrl.delete_personaje = async (request, response) => {
   const id = request.params.id
  try {
     await personajesService.delete(id)
    response.json(
      {
        mensaje: 'Eliminado correctamente',
      },

    ).status(200);
  } catch (error) {
    response.status(500).send(error.message);
  }
};

personajesCtrl.add_personaje = async (request, response) => {
  try {
    await personajesService.add(request.body);
    response.redirect('/API/getAllPersonajes');
  } catch (error) {
    response.status(500).send(error.message);
  }
};

personajesCtrl.get_personaje = async (request, response) => {
  const id = request.params.id;
  try {
    const user = await personajesService.getById({ _id: id });
    response.status(200).send(user);
  } catch (error) {
    response.end(error.message).status(204);
  }
};

personajesCtrl.edit_personaje = async (request, response) => {
  const body = request.body;
  const id = request.params.id;

  try {
    await personajesService.editById(id, body);
    response.redirect("/API/getAllPersonajes");
  } catch (error) {
    response.status(500).send(error.message);
  }
};

// Ejercicio 1
personajesCtrl.Ejercicio1 = async (request, response) => {
  try {
    const arrayPersonajes = await personajesService.buscar_humanos()
    response.status(200)
      .render(path.join(__dirname, '../views/pages/getAllPersonajes'), ({
        arrayPersonajes: arrayPersonajes
      }));
  } catch (error) {
    console.log(error);
  }
};

personajesCtrl.Ejercicio2 = async (rrequest, response) => {
  try {
    const arrayPersonajes = await personajesService.afiliacion_Sith()
    response.status(200)
      .render(path.join(__dirname, '../views/pages/getAllPersonajes'), ({
        arrayPersonajes: arrayPersonajes
      }));
  } catch (error) {
    console.log(error);
  }
};
personajesCtrl.Ejercicio3 = async (request, response) => {
  try {
    const arrayPersonajes = await personajesService.planetaNatal_Tattooine()
    response.status(200)
      .render(path.join(__dirname, '../views/pages/getAllPersonajes'), ({
        arrayPersonajes: arrayPersonajes
      }));
  } catch (error) {
    console.log(error);
  }
};

module.exports = personajesCtrl
