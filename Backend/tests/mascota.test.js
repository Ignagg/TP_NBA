const request = require('supertest');
const app = require('../index.js');

const mascotaAlta = {
  Nombre: "Mascota " + (() => (Math.random() + 1).toString(36).substring(2))(),
  Id_Equipo: 7,
  Fecha_de_Aparicion: "2021-06-01",
  Edad: 1
};

const mascotaModificacion = {
  Nombre: "Mascota " + (() => (Math.random() + 1).toString(36).substring(2))(),
  Id_Equipo: 7,
  Fecha_de_Aparicion: "2021-06-06",
  Edad: 1
};

describe('GET /api/mascotas', () => {
  test('Debería responder un statusCode 200', async () => {
    const response = await request(app).get('/api/mascotas').send();
    expect(response.statusCode).toBe(200);
  });


});

describe('GET /api/mascotas/:id', () => {
  it('Mascotas por ID', async () => {
    const res = await request(app).get('/api/mascotas/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe('GET /api/mascotas/nombre/:nombre', () => {
  it('Mascotas por nombre', async () => {
    const res = await request(app).get('/api/mascotas/nombre/Burnie');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

let mascotaId;

describe('POST /api/mascotas/', function () {
  it('Agregar mascota', async function () {
    const res = await request(app).post('/api/mascotas/').send(mascotaAlta);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Id_Mascota: expect.any(Number),
        Nombre: expect.any(String),
        Id_Equipo: expect.any(Number),
        Edad: expect.any(Number),
        Fecha_de_Aparicion: expect.any(String)
      })
    );
    mascotaId = res.body.Id_Mascota;
  });
});

describe('PUT /api/mascotas/:id', function () {
  it('Modificar mascota', async function () {
    // Asegúrate de que mascotaId tenga un valor antes de usarlo
    if (!mascotaId) {
      throw new Error("No se ha creado la mascota, por lo tanto, no se puede modificar.");
    }
    const res = await request(app).put(`/api/mascotas/${mascotaId}`).send(mascotaModificacion);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Id_Mascota: expect.any(Number),
        Nombre: expect.any(String),
        Id_Equipo: expect.any(Number),
        Edad: expect.any(Number),
        Fecha_de_Aparicion: expect.any(String)
      })
    );
  });
});

describe('DELETE /api/mascotas/:id', function () {
  it('Eliminar mascota', async function () {
    // Asegúrate de que mascotaId tenga un valor antes de usarlo
    if (!mascotaId) {
      throw new Error("No se ha creado la mascota, por lo tanto, no se puede eliminar.");
    }
    const res = await request(app).delete(`/api/mascotas/${mascotaId}`);
    expect(res.statusCode).toBe(200);
  });
});