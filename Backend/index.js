const express = require("express");
const cors = require('cors');
const { sequelize } = require("./databases/sqlconect");

//IMPORTACION DE TODAS LAS RUTAS
const contratosRouter = require("./routes/contrato.routes");
const entrenadoresRouter = require("./routes/entrenadores.routes");
const equiposRouter = require("./routes/equipos.routes");
const estadioRouter = require("./routes/estadio.routes");
const jugadoresRouter = require("./routes/jugadores.routes");
const partidosRouter = require("./routes/partidos.routes");
const sociosRouter = require("./routes/socios.routes");
const mascotasRouter = require("./routes/mascota.routes");

const app = express();
app.use(express.json());
app.use(cors())

//RUTAS EN EL SERVIDOR WEB
app.use(contratosRouter);
app.use(entrenadoresRouter);
app.use(equiposRouter);
app.use(estadioRouter);
app.use(jugadoresRouter);
app.use(partidosRouter);
app.use(sociosRouter);
app.use(mascotasRouter);

//Inicio del servidor
if (process.env.NODE_ENV !== 'test') { //Para que no se inicie el servidor en los test
  app.listen(3001, async () => {
    await sequelize.sync();
    console.log("Servidor iniciado en el puerto 3001");
  });
}

module.exports = app
