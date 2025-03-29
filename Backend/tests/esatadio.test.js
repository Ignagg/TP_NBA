const request = require('supertest');
const app = require('../index.js');

const estadioAlta = {
  Nombre_del_Estadio: "Estadio " + (() => (Math.random() + 1).toString(36).substring(2))(),
  Fecha_de_Inauguración : "2021-06-01",
  Capacidad: 10000,
  Ciudad: "Cordoba",
};

const estadioModificacion = {
  Nombre_del_Estadio: "Estadio " + (() => (Math.random() + 1).toString(36).substring(2))(),
  Fecha_de_Inauguración : "2021-06-01",
  Capacidad: 10000,
  Ciudad: "Cordobaaaa",
};

describe('GET /api/estadios', () => {
  test('Debería responder un statusCode 200', async () => {
      const response = await request(app).get('/api/estadios').send();
      expect(response.statusCode).toBe(200);
  });

});

describe('GET /api/estadios/:id', () => {
  it('Estadios por ID', async () => {
    const res = await request(app).get('/api/estadios/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe('GET /api/estadios/nombre/:nombre', () => {
  it('Estadios por nombre', async () => {
    const res = await request(app).get('/api/estadios/nombre/Ch');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

let estadioId;

describe('POST /api/estadios/', function () {
  it('Agregar estadio', async function () {
    const res = await request(app).post('/api/estadios/').send(estadioAlta);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Nombre_del_Estadio: expect.any(String),
        Fecha_de_Inauguración : expect.any(String),
        Capacidad: expect.any(Number),
        Ciudad: expect.any(String)
      })
    );
    estadioId = res.body.Id_Estadio;
  });
});

describe('PUT /api/estadios/:id', function () {
  it('Actualizar estadio', async function () {
    // Asegúrate de que estadioId tenga un valor antes de usarlo
    if (!estadioId) {
      throw new Error("No se ha creado el estadio, por lo tanto, no se puede actualizar.");
    }
    const res = await request(app).put(`/api/estadios/${estadioId}`).send(estadioModificacion);
    expect(res.statusCode).toBe(200);
    // Ajusta esta expectativa según lo que tu API devuelva al actualizar un estadio
    expect(res.body).toEqual(expect.anything()); // Ajusta según la respuesta esperada
  });
});

describe('DELETE /api/estadios/:id', function () {
  it('Eliminar estadio', async function () {
    // Asegúrate de que estadioId tenga un valor antes de usarlo
    if (!estadioId) {
      throw new Error("No se ha creado el estadio, por lo tanto, no se puede eliminar.");
    }
    const res = await request(app).delete(`/api/estadios/${estadioId}`);
    expect(res.statusCode).toBe(200);
    // Ajusta esta expectativa según lo que tu API devuelva al eliminar un estadio
    expect(res.body).toEqual(expect.anything()); // Ajusta según la respuesta esperada
  });
});