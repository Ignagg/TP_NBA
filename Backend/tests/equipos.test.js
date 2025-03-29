const request = require('supertest');
const app = require('../index.js');

const equipoAlta = {
  Nombre_del_Equipo: "Equipo " + (() => (Math.random() + 1).toString(36).substring(2))(),
  Fundado: "2021-06-01",
  Id_Estadio: 1,
  Id_Entrenador: 1,
  Ciudad: "Cordoba"
};  

const equipoModificacion = {
  Nombre_del_Equipo: "Equipo " + (() => (Math.random() + 1).toString(36).substring(2))(),
  Fundado: "2021-06-01",
  Id_Estadio: 1,
  Id_Entrenador: 1,
  Ciudad: "Cordobaaaaaaa"
};

describe('GET /api/equipos', () => {
  test('Debería responder un statusCode 200', async () => {
      const response = await request(app).get('/api/equipos').send();
      expect(response.statusCode).toBe(200);
  });
});


describe('GET /api/equipos/:id', () => {
  it('Equipos por ID', async () => {
    const res = await request(app).get('/api/equipos/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe('GET /api/equipos/nombre/:nombre', () => {
  it('Equipos por Nombre', async () => {
    const res = await request(app).get('/api/equipos/nombre/Golden');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

let equipoId;

describe('POST /api/equipos/', function () {
  it('Crear equipo', async function () {
    const res = await request(app)
      .post('/api/equipos/')
      .send(equipoAlta);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Id_Equipo: expect.any(Number),
        Nombre_del_Equipo: expect.any(String),
        Fundado: expect.any(String),
        Id_Estadio: expect.any(Number),
        Id_Entrenador: expect.any(Number),
        Ciudad: expect.any(String)
      })
    );
    equipoId = res.body.Id_Equipo;
  });
});

describe('PUT /api/equipos/:id', function () {
  it('Modificar equipo', async function () {
    // Asegúrate de que equipoId tenga un valor antes de usarlo
    if (!equipoId) {
      throw new Error("No se ha creado el equipo, por lo tanto, no se puede modificar.");
    }
    const res = await request(app)
      .put(`/api/equipos/${equipoId}`)
      .send(equipoModificacion);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Id_Equipo: expect.any(Number),
        Nombre_del_Equipo: expect.any(String),
        Fundado: expect.any(String),
        Id_Estadio: expect.any(Number),
        Id_Entrenador: expect.any(Number),
        Ciudad: expect.any(String)
      })
    );
  });
});

describe('DELETE /api/equipos/:id', function () {
  it('Eliminar equipo', async function () {
    // Asegúrate de que equipoId tenga un valor antes de usarlo
    if (!equipoId) {
      throw new Error("No se ha creado el equipo, por lo tanto, no se puede eliminar.");
    }
    const res = await request(app)
      .delete(`/api/equipos/${equipoId}`);
    expect(res.statusCode).toBe(200);
  });
});
