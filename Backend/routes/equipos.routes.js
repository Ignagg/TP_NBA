const express = require('express');
const router = express.Router();
const Equipo = require('../model/equipos.js');
const { Op, ValidationError } = require("sequelize");

// Funcion para buscar por descripcion
const getByNombre = async (nombre) => {
  try{
      const equipos = await Equipo.findAll({
          where: {
              Nombre_del_Equipo: {
                  [Op.like]: `%${nombre}%`
              }
          }
      })
      return equipos
  }
  catch (error){
      console.log(error);
      return { error: error.message };
  }
}

// funcion para actualizar equipo
const actualizarEquipo = async (Id_Equipo, body) => {
  const equipoAActualizar = await Equipo.findByPk(Id_Equipo)
  if (!equipoAActualizar) { 
      throw new Error("Error, no existe ese equipo")
  }

  if (!body.Fundado || !body.Nombre_del_Equipo || !body.Id_Estadio || !body.Id_Entrenador || !body.Ciudad) {
      throw new Error("Error, falta algun dato")
  }

  equipoAActualizar.Fundado = body.Fundado
  equipoAActualizar.Nombre_del_Equipo = body.Nombre_del_Equipo
  equipoAActualizar.Id_Estadio = body.Id_Estadio
  equipoAActualizar.Id_Entrenador = body.Id_Entrenador
  equipoAActualizar.Ciudad = body.Ciudad

  await equipoAActualizar.save()
  return equipoAActualizar.dataValues
}

// GET ALL
router.get("/api/equipos", async function (req, res, next) {
  try {
    let where = {};
    if (req.query.Id_Equipo != undefined && req.query.Id_Equipo !== "") {
      where.Id_Equipo = {
        [Op.like]: "%" + req.query.Id_Equipo.trim() + "%",
      };
    }
    const Pagina = parseInt(req.query.Pagina) || 1;
    const TamañoPagina = 40;

    const { count, rows } = await Equipo.findAndCountAll({
      attributes: [
        "Id_Equipo",
        "Fundado",
        "Nombre_del_Equipo",
        "Id_Estadio",
        "Id_Entrenador",
        "Ciudad",
      ],
      order: [["Id_Equipo", "ASC"]],
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
router.get("/api/equipos/:id", async function (req, res, next) {
  let items = await Equipo.findOne({
    attributes: [
      "Id_Equipo",
        "Fundado",
        "Nombre_del_Equipo",
        "Id_Estadio",
        "Id_Entrenador",
        "Ciudad",
    ],
    where: { Id_Equipo: req.params.id },
  });
  res.json(items);
});


// GET BY NOMBRE
router.get("/api/equipos/nombre/:nombre", async function (req, res) {
  try {
      const equipos = await getByNombre(req.params.nombre)
      return res.json(equipos)
  } catch (error) {
      res.status(500).json({ error: "Error" })
  }
});

// POST
router.post("/api/equipos/", async (req, res) => {
  try {
    let data = await Equipo.create({
      Fundado: req.body.Fundado,
      Nombre_del_Equipo: req.body.Nombre_del_Equipo,
      Id_Estadio: req.body.Id_Estadio,
      Id_Entrenador: req.body.Id_Entrenador,
      Ciudad: req.body.Ciudad,
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

// PUT
router.put("/api/equipos/:id", async (req, res) => {
  try {
    const equipoActualizado = await actualizarEquipo(req.params.id, req.body)
    return res.json(equipoActualizado)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
});

// DELETE
router.delete("/api/equipos/:id", async (req, res) => {
  // #swagger.tags = ['equipos']
  // #swagger.summary = 'elimina un equipos'
  // #swagger.parameters['id'] = { description: 'identificador del equipos..' }
  try {
    let filasBorradas = await Equipo.destroy({
      where: { Id_Equipo: req.params.id },
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