const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const makeResponse = () => {
  const response = {
    statusCode: 200,
    view: null,
    viewModel: null,
    redirectPath: null,
    jsonBody: null,
    sendBody: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    render(view, viewModel) {
      this.view = view;
      this.viewModel = viewModel;
      return this;
    },
    redirect(location) {
      this.redirectPath = location;
      return this;
    },
    json(body) {
      this.jsonBody = body;
      return this;
    },
    send(body) {
      this.sendBody = body;
      return this;
    },
  };

  return response;
};

const loadModuleWithMocks = (modulePath, mocks) => {
  const resolvedModulePath = require.resolve(modulePath);
  const previousEntries = new Map();

  delete require.cache[resolvedModulePath];

  for (const [targetPath, mockExports] of Object.entries(mocks)) {
    const resolvedTargetPath = require.resolve(targetPath);
    previousEntries.set(resolvedTargetPath, require.cache[resolvedTargetPath]);
    require.cache[resolvedTargetPath] = {
      id: resolvedTargetPath,
      filename: resolvedTargetPath,
      loaded: true,
      exports: mockExports,
    };
  }

  const loadedModule = require(resolvedModulePath);

  delete require.cache[resolvedModulePath];

  for (const [targetPath] of Object.entries(mocks)) {
    const resolvedTargetPath = require.resolve(targetPath);
    const previousEntry = previousEntries.get(resolvedTargetPath);

    if (previousEntry) {
      require.cache[resolvedTargetPath] = previousEntry;
    } else {
      delete require.cache[resolvedTargetPath];
    }
  }

  return loadedModule;
};

test('controller.utils.ensureFound returns entity and throws 404 when missing', () => {
  const { ensureFound } = require('../src/controllers/controller.utils');
  const entity = { id: '123' };

  assert.equal(ensureFound(entity, 'missing'), entity);

  assert.throws(
    () => ensureFound(null, 'missing'),
    (error) => error.message === 'missing' && error.status === 404
  );
});

test('controller.utils.renderPage renders absolute view path with status 200', () => {
  const { renderPage } = require('../src/controllers/controller.utils');
  const response = makeResponse();

  renderPage(response, '../views/pages/getAllPelis', { arrayPeliculas: [] });

  assert.equal(response.statusCode, 200);
  assert.equal(
    response.view,
    path.join(process.cwd(), 'src', 'views', 'pages', 'getAllPelis')
  );
  assert.deepEqual(response.viewModel, { arrayPeliculas: [] });
});

test('Crud service delegates to mongoose model methods correctly', async () => {
  const Crud = require('../src/service/crud.service');
  const calls = [];
  const model = {
    find() {
      calls.push(['find']);
      return ['all'];
    },
    findByIdAndDelete(id) {
      calls.push(['findByIdAndDelete', id]);
      return { id };
    },
    create(body) {
      calls.push(['create', body]);
      return body;
    },
    findById(id) {
      calls.push(['findById', id]);
      return { id };
    },
    findByIdAndUpdate(id, body, options) {
      calls.push(['findByIdAndUpdate', id, body, options]);
      return { id, ...body };
    },
  };

  const service = new Crud(model);

  assert.deepEqual(await service.getAll(), ['all']);
  assert.deepEqual(await service.delete('1'), { id: '1' });
  assert.deepEqual(await service.add({ a: 1 }), { a: 1 });
  assert.deepEqual(await service.getById('2'), { id: '2' });
  assert.deepEqual(await service.editById('3', { b: 2 }), { id: '3', b: 2 });

  assert.deepEqual(calls, [
    ['find'],
    ['findByIdAndDelete', '1'],
    ['create', { a: 1 }],
    ['findById', '2'],
    ['findByIdAndUpdate', '3', { b: 2 }, { new: true, runValidators: true }],
  ]);
});

test('pelis controller renders list and handles edit/delete with shared conventions', async () => {
  const movie = { _id: '1', Titulo: 'A New Hope' };
  const movieServiceMock = {
    getAll: async () => [movie],
    getById: async () => movie,
    add: async () => movie,
    editById: async () => movie,
    delete: async () => movie,
    director_GLucas: async () => [movie],
  };

  const pelisCtrl = loadModuleWithMocks(
    '../src/controllers/pelis.controlller.js',
    {
      '../src/service/peliculas.service.js': movieServiceMock,
    }
  );

  const listResponse = makeResponse();
  await pelisCtrl.getAllPelis({}, listResponse);
  assert.equal(listResponse.statusCode, 200);
  assert.equal(
    listResponse.view,
    path.join(process.cwd(), 'src', 'views', 'pages', 'getAllPelis')
  );
  assert.deepEqual(listResponse.viewModel, { arrayPeliculas: [movie] });

  const editViewResponse = makeResponse();
  await pelisCtrl.getEditPeli({ params: { id: '1' } }, editViewResponse);
  assert.equal(
    editViewResponse.view,
    path.join(process.cwd(), 'src', 'views', 'pages', 'OnePeli')
  );
  assert.deepEqual(editViewResponse.viewModel, { pelicula: movie });

  const addResponse = makeResponse();
  await pelisCtrl.add_peli({ body: movie }, addResponse);
  assert.equal(addResponse.redirectPath, '/API/getAllPelis');

  const editResponse = makeResponse();
  await pelisCtrl.editPeli({ params: { id: '1' }, body: movie }, editResponse);
  assert.equal(editResponse.redirectPath, '/API/getAllPelis');

  const deleteResponse = makeResponse();
  await pelisCtrl.deletePeli({ params: { id: '1' } }, deleteResponse);
  assert.equal(deleteResponse.statusCode, 200);
  assert.deepEqual(deleteResponse.jsonBody, { mensaje: 'Eliminado correctamente' });
});

test('pelis controller throws 404 when movie does not exist', async () => {
  const pelisCtrl = loadModuleWithMocks(
    '../src/controllers/pelis.controlller.js',
    {
      '../src/service/peliculas.service.js': {
        getById: async () => null,
        editById: async () => null,
        delete: async () => null,
      },
    }
  );

  await assert.rejects(
    () => pelisCtrl.getEditPeli({ params: { id: 'missing' } }, makeResponse()),
    (error) => error.message === 'Pelicula no encontrada' && error.status === 404
  );

  await assert.rejects(
    () => pelisCtrl.editPeli({ params: { id: 'missing' }, body: {} }, makeResponse()),
    (error) => error.message === 'Pelicula no encontrada' && error.status === 404
  );

  await assert.rejects(
    () => pelisCtrl.deletePeli({ params: { id: 'missing' } }, makeResponse()),
    (error) => error.message === 'Pelicula no encontrada' && error.status === 404
  );
});

test('personajes controller renders edit view and returns 404 for missing record', async () => {
  const character = { _id: '2', nombre: 'Luke' };
  const personajesCtrl = loadModuleWithMocks(
    '../src/controllers/personajes.controller.js',
    {
      '../src/service/personajes.service.js': {
        getAll: async () => [character],
        getById: async () => character,
        add: async () => character,
        editById: async () => character,
        delete: async () => character,
        buscar_humanos: async () => [character],
        afiliacion_Sith: async () => [],
        planetaNatal_Tattooine: async () => [character],
      },
    }
  );

  const editViewResponse = makeResponse();
  await personajesCtrl.getEditPersonaje({ params: { id: '2' } }, editViewResponse);
  assert.equal(
    editViewResponse.view,
    path.join(process.cwd(), 'src', 'views', 'pages', 'OnePersonajes')
  );
  assert.deepEqual(editViewResponse.viewModel, { personaje: character });

  const deleteResponse = makeResponse();
  await personajesCtrl.delete_personaje({ params: { id: '2' } }, deleteResponse);
  assert.equal(deleteResponse.statusCode, 200);
  assert.deepEqual(deleteResponse.jsonBody, { mensaje: 'Eliminado correctamente' });

  const personajesCtrlMissing = loadModuleWithMocks(
    '../src/controllers/personajes.controller.js',
    {
      '../src/service/personajes.service.js': {
        getById: async () => null,
        editById: async () => null,
        delete: async () => null,
      },
    }
  );

  await assert.rejects(
    () => personajesCtrlMissing.getEditPersonaje({ params: { id: 'missing' } }, makeResponse()),
    (error) => error.message === 'Personaje no encontrado' && error.status === 404
  );
});