const personajesService = require('../service/personajes.service.js')
const { ensureFound, renderPage } = require("./controller.utils");

const personajesCtrl = {}

personajesCtrl.get_personajes = async (request, response) => {
  const arrayPersonajes = await personajesService.getAll();

  return renderPage(response, '../views/pages/getAllPersonajes', {
    arrayPersonajes,
  });
};

personajesCtrl.getAddPersonaje = async (request, response) => {
  return renderPage(response, "../views/pages/addPersonaje");
}
personajesCtrl.getEditPersonaje = async (request, response) => {
  const personaje = ensureFound(
    await personajesService.getById(request.params.id),
    'Personaje no encontrado'
  );

  return renderPage(response, "../views/pages/OnePersonajes", {
    personaje,
  });
}
personajesCtrl.delete_personaje = async (request, response) => {
  ensureFound(
    await personajesService.delete(request.params.id),
    'Personaje no encontrado'
  );

  return response.status(200).json({
    mensaje: 'Eliminado correctamente',
  });
};

personajesCtrl.add_personaje = async (request, response) => {
  await personajesService.add(request.body);

  return response.redirect('/API/getAllPersonajes');
};

personajesCtrl.get_personaje = async (request, response) => {
  const personaje = ensureFound(
    await personajesService.getById(request.params.id),
    'Personaje no encontrado'
  );

  return response.status(200).send(personaje);
};

personajesCtrl.edit_personaje = async (request, response) => {
  ensureFound(
    await personajesService.editById(request.params.id, request.body),
    'Personaje no encontrado'
  );

  return response.redirect("/API/getAllPersonajes");
};

// Ejercicio 1
personajesCtrl.Ejercicio1 = async (request, response) => {
  const arrayPersonajes = await personajesService.buscar_humanos()

  return renderPage(response, '../views/pages/getAllPersonajes', {
    arrayPersonajes,
  });
};

personajesCtrl.Ejercicio2 = async (rrequest, response) => {
  const arrayPersonajes = await personajesService.afiliacion_Sith()

  return renderPage(response, '../views/pages/getAllPersonajes', {
    arrayPersonajes,
  });
};
personajesCtrl.Ejercicio3 = async (request, response) => {
  const arrayPersonajes = await personajesService.planetaNatal_Tattooine()

  return renderPage(response, '../views/pages/getAllPersonajes', {
    arrayPersonajes,
  });
};

module.exports = personajesCtrl
