const request = require('supertest');
const app = require('../index.js'); 

const contratoAlta = {
  Descripcion: "Contrato " + (() => (Math.random() + 1).toString(36).substring(2))(),
  Fecha_de_Inicio: "2021-06-01",
  Fecha_de_Fin: "2022-06-01",
  Id_Jugador: 7,
  Id_Equipo: 7,
  Salario_Total: 1000000
};

const contratoModificacion = {
  Descripcion: "Contrato " + (() => (Math.random() + 1).toString(36).substring(2))(),
  Fecha_de_Inicio: "2021-06-01",
  Fecha_de_Fin: "2022-06-01",
  Id_Jugador: 7,
  Id_Equipo: 7,
  Salario_Total: 1222222
};

// Test de Contratos GET ALL
describe('GET /api/contratos', () => {
  test('Debería responder un statusCode 200', async () => {
      const response = await request(app).get('/api/contratos').send();
      expect(response.statusCode).toBe(200);
  });
});

// Test de Contratos GET by ID
describe('GET /api/contratos/:id', () => {
  it('Contratos por ID', async () => {
    const res = await request(app).get('/api/contratos/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

// Test de Contratos GET by Descripcion
describe('GET /api/contratos/descripcion/:descripcion', () => {
  it('Contratos por descripcion', async () => {
    const res = await request(app).get('/api/contratos/descripcion/Two');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

let contratoId;

// Test de Contratos POST
describe("POST /api/contratos/", () => {
  it("Deberia devolver el contrato que acabo de crear", async () => {
    const res = await request(app).post("/api/contratos/").send(contratoAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Id_Contrato: expect.any(Number),
        Descripcion: expect.any(String),
        Fecha_de_Inicio: expect.any(String),
        Fecha_de_Fin: expect.any(String),
        Id_Jugador: expect.any(Number),
        Id_Equipo: expect.any(Number),
        Salario_Total: expect.any(Number)
      })
    );
    contratoId = res.body.Id_Contrato;
  });
});

// Test de Contratos PUT
describe('PUT /api/contratos/:id', function () {
  it('Actualizar contrato', async function () {
    const res = await request(app)
      .put(`/api/contratos/${contratoId}`)
      .send(contratoModificacion);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Id_Contrato: expect.any(Number),
        Descripcion: expect.any(String),
        Fecha_de_Inicio: expect.any(String),
        Fecha_de_Fin: expect.any(String),
        Id_Jugador: expect.any(Number),
        Id_Equipo: expect.any(Number),
        Salario_Total: expect.any(Number)
      })
    );
  });
});

// Test de Contratos DELETE
describe('DELETE /api/contratos/:id', function () {
  it('Eliminar contrato', async function () {
    // Asegúrate de que contratoId tenga un valor antes de usarlo
    if (!contratoId) {
      throw new Error("No se ha creado el contrato, por lo tanto, no se puede eliminar.");
    }
    const res = await request(app).delete(`/api/contratos/${contratoId}`);
    expect(res.statusCode).toBe(200);
    // Ajusta esta expectativa según lo que tu API devuelva al eliminar un contrato
    expect(res.body).toEqual(expect.anything()); // Ajusta según la respuesta esperada
  });
});