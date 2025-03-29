const request = require('supertest');
const app = require('../index.js');

const partidoAlta = {
  Id_Equipo_Local: 7,
  Id_Equipo_Visitante: 6,
  Fecha_del_Partido: "2021-06-02",
  Descripcion: "Partido " + (() => (Math.random() + 1).toString(36).substring(2))()
};

const partidoModificacion = {
  Id_Equipo_Local: 7,
  Id_Equipo_Visitante: 6,
  Fecha_del_Partido: "2021-07-03",
  Descripcion: "Partido " + (() => (Math.random() + 1).toString(36).substring(2))()
};

describe('GET /api/partidos', () => {
  test('Debería responder un statusCode 200', async () => {
    const response = await request(app).get('/api/partidos').send();
    expect(response.statusCode).toBe(200);
  });

});

describe('GET /api/partidos/:id', () => {
  it('Partidos por ID', async () => {
    const res = await request(app).get('/api/partidos/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe('GET /api/partidos/descripcion/:descripcion', () => {
  it('Partidos por descripcion', async () => {
    const res = await request(app).get('/api/partidos/descripcion/Regular Season - Game 1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

let partidoId;

describe('POST /api/partidos/', function () {
  it('Agregar partido', async function () {
    const res = await request(app).post('/api/partidos/').send(partidoAlta);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Id_Partido: expect.any(Number),
          Id_Equipo_Local: expect.any(Number),
          Id_Equipo_Visitante: expect.any(Number),
          Fecha_del_Partido: expect.any(String),
          Descripcion: expect.any(String)
      })
    );
    partidoId = res.body.Id_Partido;
  });
});

describe('PUT /api/partidos/:id', function () {
  it('Actualizar partido', async function () {
    const res = await request(app)
      .put(`/api/partidos/${partidoId}`)
      .send(partidoModificacion);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Id_Partido: expect.any(Number),
        Id_Equipo_Local: expect.any(Number),
        Id_Equipo_Visitante: expect.any(Number),
        Fecha_del_Partido: expect.any(String),
        Descripcion: expect.any(String)
      })
    );
  });
});

describe('DELETE /api/partidos/:id', function () {
  it('Eliminar partido', async function () {
    // Asegúrate de que partidoId tenga un valor antes de usarlo
    if (!partidoId) {
      throw new Error("No se ha creado el partido, por lo tanto, no se puede eliminar.");
    }
    const res = await request(app).delete(`/api/partidos/${partidoId}`);
    expect(res.statusCode).toBe(200);
    // Ajusta esta expectativa según lo que tu API devuelva al eliminar un partido
    expect(res.body).toEqual(expect.anything()); // Ajusta según la respuesta esperada
  });
});