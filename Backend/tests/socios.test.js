const request = require('supertest');
const app = require('../index.js');

const socioAlta = {
  Id_Equipo: 7,
  Nombre: "Socio " + (() => (Math.random() + 1).toString(36).substring(2))(),
  Fecha_de_Afiliacion: "2021-06-01",
  Edad: 23
};

const socioModificacion = {
  Id_Equipo: 7,
  Nombre: "Socio " + (() => (Math.random() + 1).toString(36).substring(2))(),
  Fecha_de_Afiliacion: "2021-06-04",
  Edad: 23
};

describe('GET /api/socios', () => {
  test('Debería responder un statusCode 200', async () => {
    const response = await request(app).get('/api/socios').send();
    expect(response.statusCode).toBe(200);
  });

});


describe('GET /api/socios/:id', () => {
  it('Socios por ID', async () => {
    const res = await request(app).get('/api/socios/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe('GET /api/socios/nombre/:nombre', () => {
  it('Socios por nombre', async () => {
    const res = await request(app).get('/api/socios/nombre/John');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

let socioId;

describe('POST /api/socios/', function () {
  it('Agregar socio', async function () {
    const res = await request(app).post('/api/socios/').send(socioAlta);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Id_Socio: expect.any(Number),
        Nombre: expect.any(String),
        Id_Equipo: expect.any(Number),
        Edad: expect.any(Number),
        Fecha_de_Afiliacion: expect.any(String)
      })
    );
    socioId = res.body.Id_Socio;
  });
});

describe('PUT /api/socios/:id', function () {
  it('Actualizar socio', async function () {
    // Asegúrate de que socioId tenga un valor antes de usarlo
    if (!socioId) {
      throw new Error("No se ha creado el socio, por lo tanto, no se puede modificar.");
    }
    const res = await request(app).put(`/api/socios/${socioId}`).send(socioModificacion);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Id_Socio: expect.any(Number),
        Nombre: expect.any(String),
        Id_Equipo: expect.any(Number),
        Edad: expect.any(Number),
        Fecha_de_Afiliacion: expect.any(String)
      })
    );
  });
});

describe('DELETE /api/socios/:id', function () {
  it('Eliminar socio', async function () {
    // Asegúrate de que socioId tenga un valor antes de usarlo
    if (!socioId) {
      throw new Error("No se ha creado el socio, por lo tanto, no se puede eliminar.");
    }
    const res = await request(app).delete(`/api/socios/${socioId}`);
    expect(res.statusCode).toBe(200);
  });
});