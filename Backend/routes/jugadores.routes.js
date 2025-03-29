const express = require('express');
const router = express.Router();
const Jugadores = require('../model/jugadores.js');
const { Op, ValidationError } = require("sequelize");

// Funcion para buscar por nombre
const getByNombre = async (nombre) => {
  try{
      const jugadores = await Jugadores.findAll({
          where: {
              Nombre_del_Jugador: {
                  [Op.like]: `%${nombre}%`
              }
          }
      })
      return jugadores
  }
  catch (error){
      console.log(error);
      return { error: error.message };
  }
};

// funcion para actualizar jugador
const actualizarJugador = async (Id_Jugadores, body) => {
  const jugadorAActualizar = await Jugadores.findByPk(Id_Jugadores)
  if (!jugadorAActualizar) { 
      throw new Error("Error, no existe ese jugador")
  }

  if (!body.Nombre_del_Jugador || !body.Id_Equipo || !body.Fecha_de_Nacimiento) {
      throw new Error("Error, falta algun dato")
  }

  jugadorAActualizar.Nombre_del_Jugador = body.Nombre_del_Jugador
  jugadorAActualizar.Id_Equipo = body.Id_Equipo
  jugadorAActualizar.Fecha_de_Nacimiento = body.Fecha_de_Nacimiento

  await jugadorAActualizar.save()
  return jugadorAActualizar.dataValues
};

// GET ALL
router.get("/api/jugadores", async function (req, res, next) {
  try {
    let where = {};
    if (req.query.Id_Jugadores != undefined && req.query.Id_Jugadores !== "") {
      where.Id_Jugadores = {
        [Op.like]: "%" + req.query.Id_Jugadores.trim() + "%",
      };
    }
    const Pagina = parseInt(req.query.Pagina) || 1;
    const TamañoPagina = 40;

    const { count, rows } = await Jugadores.findAndCountAll({
      attributes: [
        "Id_Jugadores",
        "Nombre_del_Jugador",
        "Id_Equipo",
        "Fecha_de_Nacimiento",
      ],
      order: [["Id_Jugadores", "ASC"]],
      where,
      offset: (Pagina - 1) * TamañoPagina,
      limit: TamañoPagina,
    });

    return res.json({ Items: rows, RegistrosTotal: count });


  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});

// GET BY ID  
router.get("/api/jugadores/:id", async function (req, res, next) {
  let items = await Jugadores.findOne({
    attributes: [
      "Id_Jugadores",
        "Nombre_del_Jugador",
        "Id_Equipo",
        "Fecha_de_Nacimiento",
    ],
    where: { Id_Jugadores: req.params.id },
  });
  res.json(items);
});

// GET BY NOMBRE
router.get('/api/jugadores/nombre/:nombre', async function (req, res) {
  try {
      const jugadores = await getByNombre(req.params.nombre)
      return res.json(jugadores)
  } catch (error) {
      res.status(500).json({ error: "Error" })
  }
});

// POST
router.post("/api/jugadores/", async (req, res) => {
  try {
    let data = await Jugadores.create({
      Nombre_del_Jugador: req.body.Nombre_del_Jugador,
      Id_Equipo: req.body.Id_Equipo,
      Fecha_de_Nacimiento: req.body.Fecha_de_Nacimiento
    });
    res.status(200).json(data.dataValues); // devolvemos el registro agregado!
  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validación, los devolvemos
      let messages = '';
      err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
      res.status(400).json({ message: messages });
    } else if (err.name === 'SequelizeForeignKeyConstraintError') {
      // Manejo específico para errores de clave foránea
      res.status(400).json({ message: "Error de clave foránea, uno de los valores referenciados no existe." });
    }  
    else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

// PUT By id
router.put("/api/jugadores/:id", async (req, res) => {
  // #swagger.tags = ['equipos']
  // #swagger.summary = 'actualiza un equipos'
  // #swagger.parameters['id'] = { description: 'identificador del equipos..' }
  try {
    const jugadorActualizado = await actualizarJugador(req.params.id, req.body)
    return res.json(jugadorActualizado)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
});

// DELETE By id
router.delete("/api/jugadores/:id", async (req, res) => {
  // #swagger.tags = ['equipos']
  // #swagger.summary = 'elimina un equipos'
  // #swagger.parameters['id'] = { description: 'identificador del equipos..' }
  try {
    let filasBorradas = await Jugadores.destroy({
      where: { Id_Jugadores: req.params.id },
    });

    if (filasBorradas === 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    if (err instanceof ValidationError) {
      const messages = err.errors.map((x) => x.message);
      res.status(400).json(messages);
    } else {
      res.sendStatus(500);
    }
  }
});

module.exports = router;