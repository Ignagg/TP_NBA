const express = require('express');
const router = express.Router();
const Partido = require('../model/partidos.js');
const { Op, ValidationError } = require("sequelize");

// Funcion para buscar por descripcion
const getByDescripcion = async (descripcion) => {
  try{
      const partidos = await Partido.findAll({
          where: {
              Descripcion: {
                  [Op.like]: `%${descripcion}%`
              }
          }
      })
      return partidos
  }
  catch (error){
      console.log(error);
      return { error: error.message };
  }
};

// funcion para actualizar partido
const actualizarPartido = async (Id_Partido, body) => {
  const partidoAActualizar = await Partido.findByPk(Id_Partido)
  if (!partidoAActualizar) { 
      throw new Error("Error, no existe ese partido")
  }

  if (!body.Id_Equipo_Local || !body.Id_Equipo_Visitante || !body.Descripcion || !body.Fecha_del_Partido) {
      throw new Error("Error, falta algun dato")
  }

  partidoAActualizar.Id_Equipo_Local = body.Id_Equipo_Local
  partidoAActualizar.Id_Equipo_Visitante = body.Id_Equipo_Visitante
  partidoAActualizar.Descripcion = body.Descripcion
  partidoAActualizar.Fecha_del_Partido = body.Fecha_del_Partido

  await partidoAActualizar.save()
  return partidoAActualizar.dataValues
}

// GET ALL
router.get("/api/partidos", async function (req, res, next) {
  try {
    let where = {};
    if (req.query.Id_Partido != undefined && req.query.Id_Partido !== "") {
      where.Id_Partido = {
        [Op.like]: "%" + req.query.Id_Partido.trim() + "%",
      };
    }
    const Pagina = parseInt(req.query.Pagina) || 1;
    const TamañoPagina = 40;

    const { count, rows } = await Partido.findAndCountAll({
      attributes: [
        "Id_Partido",
        "Id_Equipo_Local",
        "Id_Equipo_Visitante",
        "Descripcion",
        "Fecha_del_Partido"
      ],
      order: [["Id_Partido", "ASC"]],
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
router.get("/api/partidos/:id", async function (req, res, next) {
  let items = await Partido.findOne({
    attributes: [
      "Id_Partido",
      "Id_Equipo_Local",
      "Id_Equipo_Visitante",
      "Descripcion",
      "Fecha_del_Partido"
    ],
    where: { Id_Partido: req.params.id },
  });
  res.json(items);
});

// GET BY Descripcion
router.get('/api/partidos/descripcion/:descripcion', async function (req, res) {
  try {
    const partidos = await getByDescripcion(req.params.descripcion)
    return res.json(partidos)
} catch (error) {
    res.status(500).json({ error: "Error" })
}
});

// POST
router.post("/api/partidos/", async (req, res) => {
  try {
    let data = await Partido.create({
      Id_Equipo_Local: req.body.Id_Equipo_Local,
      Id_Equipo_Visitante: req.body.Id_Equipo_Visitante,
      Descripcion: req.body.Descripcion,
      Fecha_del_Partido: req.body.Fecha_del_Partido
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
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

// PUT By id
router.put('/api/partidos/:id', async function (req, res, next) {
  try {
    const partidoActualizado = await actualizarPartido(req.params.id, req.body)
    return res.json(partidoActualizado)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
});

// DELETE
router.delete("/api/partidos/:id", async (req, res) => {
  // #swagger.tags = ['equipos']
  // #swagger.summary = 'elimina un equipos'
  // #swagger.parameters['id'] = { description: 'identificador del equipos..' }
  try {
    let filasBorradas = await Partido.destroy({
      where: { Id_Partido: req.params.id },
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