const request = require('supertest');
const app = require('../index.js');

const jugadorAlta = {
  Nombre_del_Jugador: "Jugador " + (() => (Math.random() + 1).toString(36).substring(2))(),
  Id_Equipo: 7,
  Fecha_de_Nacimiento: "2021-06-01"
};

const jugadorModificacion = {
  Nombre_del_Jugador: "Jugador " + (() => (Math.random() + 1).toString(36).substring(2))(),
  Id_Equipo: 7,
  Fecha_de_Nacimiento: "2021-06-06"
};

// Test de Jugadores GET ALL
describe('GET /api/jugadores', () => {
  test('Debería responder un statusCode 200', async () => {
    const response = await request(app).get('/api/jugadores').send();
    expect(response.statusCode).toBe(200);
  });

});

// Test de Jugadores GET by ID
describe('GET /api/jugadores/:id', () => {
  it('jugadores por ID', async () => {
    const res = await request(app).get('/api/jugadores/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

// Test de Jugadores GET by Nombre
describe('GET /api/jugadores/nombre/:nombre', () => {
  it('jugadores por nombre', async () => {
    const res = await request(app).get('/api/jugadores/nombre/e');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

let jugadorId; // Variable para guardar el ID del jugador creado

// Test de Jugadores POST
describe('POST /api/jugadores/', function () {
  it('Agregar jugador', async function () {
    const res = await request(app).post('/api/jugadores/').send(jugadorAlta);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
      Fecha_de_Nacimiento: expect.any(String),
      Id_Equipo: expect.any(Number),
      Id_Jugadores: expect.any(Number),
      Nombre_del_Jugador: expect.any(String)
      })
    );
    jugadorId = res.body.Id_Jugadores;
  });
});

// Test de Jugadores PUT
describe('PUT /api/jugadores/:id', function () {
  it('Actualizar jugador', async function () {
    const res = await request(app)
      .put(`/api/jugadores/${jugadorId}`)
      .send(jugadorModificacion);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Fecha_de_Nacimiento: expect.any(String),
        Id_Equipo: expect.any(Number),
        Id_Jugadores: expect.any(Number),
        Nombre_del_Jugador: expect.any(String)
      })
    );
  });
});

// Test de Jugadores DELETE
describe('DELETE /api/jugadores/:id', function () {
  it('Eliminar jugador', async function () {
    // Asegúrate de que jugadorId tenga un valor antes de usarlo
    if (!jugadorId) {
      throw new Error("No se ha creado el jugador, por lo tanto, no se puede eliminar.");
    }
    const res = await request(app).delete(`/api/jugadores/${jugadorId}`).send();
    expect(res.statusCode).toBe(200);
  }
  );
}
);