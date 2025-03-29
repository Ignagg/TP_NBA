const request = require('supertest');
const app = require('../index.js');

const entrenadorAlta = {
  Nombre_del_Entrenador: "Entrenador " + (() => (Math.random() + 1).toString(36).substring(2))(),
  Fecha_de_Nacimiento: "2021-06-01"
};

const entrenadorModificacion = {
  Nombre_del_Entrenador: "Entrenador " + (() => (Math.random() + 1).toString(36).substring(2))(),
  Fecha_de_Nacimiento: "2021-06-04"
};

// Test de Entrenadores GET ALL
describe('GET /api/entrenadores', () => {
  test('Debería responder un statusCode 200', async () => {
    const response = await request(app).get('/api/entrenadores').send();
    console.log(response.body)
    expect(response.statusCode).toBe(200);
  });
});

// Test de Entrenadores GET by ID
describe('GET /api/entrenadores/:id', () => {
  it('Entrenadores por ID', async () => {
    const res = await request(app).get('/api/entrenadores/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

// Test de Entrenadores GET by Nombre
describe('GET /api/entrenadores/nombre/:nombre', () => {
  it('Entrenadores por nombre', async () => {
    const res = await request(app).get('/api/entrenadores/nombre/Gregg');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

let entrenadorId;

describe('POST /api/entrenadores/', function () {
  it('Agregar entrenador', async function () {
    const res = await request(app).post('/api/entrenadores/').send(entrenadorAlta);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Id_Entrenador: expect.any(Number),
        Nombre_del_Entrenador: expect.any(String),
        Fecha_de_Nacimiento: expect.any(String)
      })
    );
    entrenadorId = res.body.Id_Entrenador;
  });
});

describe('PUT /api/entrenadores/:id', function () {
  it('Actualizar entrenador', async function () {
    // Asegúrate de que entrenadorId tenga un valor antes de usarlo
    if (!entrenadorId) {
      throw new Error("No se ha creado el entrenador, por lo tanto, no se puede modificar.");
    }
    const res = await request(app).put(`/api/entrenadores/${entrenadorId}`).send(entrenadorModificacion);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Id_Entrenador: expect.any(Number),
        Nombre_del_Entrenador: expect.any(String),
        Fecha_de_Nacimiento: expect.any(String)
      })
    );
  });
});

describe('DELETE /api/entrenadores/:id', function () {
  it('Eliminar entrenador', async function () {
    // Asegúrate de que entrenadorId tenga un valor antes de usarlo
    if (!entrenadorId) {
      throw new Error("No se ha creado el entrenador, por lo tanto, no se puede eliminar.");
    }
    const res = await request(app).delete(`/api/entrenadores/${entrenadorId}`);
    expect(res.statusCode).toBe(200);
  });
});

