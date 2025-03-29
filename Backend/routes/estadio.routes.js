const express = require('express');
const router = express.Router();
const Estadio = require('../model/estadio.js');
const { Op, ValidationError } = require("sequelize");

// Funcion para buscar por descripcion
const getByNombre = async (nombre) => {
  try{
      const estadios = await Estadio.findAll({
          where: {
              Nombre_del_Estadio: {
                  [Op.like]: `%${nombre}%`
              }
          }
      })
      return estadios
  }
  catch (error){
      console.log(error);
      return { error: error.message };
  }
}

// funcion para actualizar estadio
const actualizarEstadio = async (Id_Estadio, body) => {
  const estadioAActualizar = await Estadio.findByPk(Id_Estadio)
  if (!estadioAActualizar) { 
      throw new Error("Error, no existe ese estadio")
  }

  if (!body.Nombre_del_Estadio || !body.Ciudad || !body.Capacidad || !body.Fecha_de_Inauguración) {
      throw new Error("Error, falta algun dato")
  }

  estadioAActualizar.Nombre_del_Estadio = body.Nombre_del_Estadio
  estadioAActualizar.Ciudad = body.Ciudad
  estadioAActualizar.Capacidad = body.Capacidad
  estadioAActualizar.Fecha_de_Inauguración = body.Fecha_de_Inauguración

  await estadioAActualizar.save()
  return estadioAActualizar.dataValues
}

// GET ALL
router.get('/api/estadios', async function(req, res, next){
  try {
    let where = {};
    if (req.query.Id_Estadio != undefined && req.query.Id_Estadio !== "") {
      where.Id_Estadio = {
        [Op.like]: "%" + req.query.Id_Estadio.trim() + "%",
      };
    }

    const Pagina = parseInt(req.query.Pagina) || 1;
    const TamañoPagina = 40;

    const { count, rows } = await Estadio.findAndCountAll({
      attributes: ["Id_Estadio", "Nombre_del_Estadio", "Ciudad", "Capacidad","Fecha_de_Inauguración"], // Asumiendo que IdCalificacion se cambia a Id_Contrato
      order: [["Id_Estadio", "ASC"]],
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

// GET by id
router.get('/api/estadios/:id', async function (req, res, next) {
  let items = await Estadio.findOne({
    attributes: ["Id_Estadio", "Nombre_del_Estadio", "Ciudad", "Capacidad","Fecha_de_Inauguración"],
    where: { Id_Estadio: req.params.id }, // Cambio de IdCalificacion a Id_Contrato
  });
  res.json(items);
});

// GET by Nombre
router.get('/api/estadios/nombre/:nombre', async function (req, res) {
  try {
    const estadios = await getByNombre(req.params.nombre)
    res.json(estadios)
} catch (error) {
    res.status(500).json({ error: "Error" })
}
});
// POST
router.post('/api/estadios/', async function (req, res, next){
  try {
    const data = await Estadio.create({
      Nombre_del_Estadio: req.body.Nombre_del_Estadio,
      Ciudad: req.body.Ciudad,
      Capacidad: req.body.Capacidad,
      Fecha_de_Inauguración: req.body.Fecha_de_Inauguración
    });
    res.status(200).json(data);
  } catch (err) {
    if (err instanceof ValidationError) {
      let messages = '';
      err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
      res.status(400).json({message : messages});
    } else if (err.name === 'SequelizeForeignKeyConstraintError') {
      // Manejo específico para errores de clave foránea
      res.status(400).json({ message: "Error de clave foránea, uno de los valores referenciados no existe." });
    }  
    else {
      next(err);
    }
  }
});

// PUT By id
router.put('/api/estadios/:id', async function (req, res, next) {
  try {
    const estadioActualizado = await actualizarEstadio(req.params.id, req.body)
    res.status(200).json(estadioActualizado)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
});

// DELETE By id
router.delete('/api/estadios/:id', async function (req, res, next) {
  try {
    let filasBorradas = await Estadio.destroy({
      where: { Id_Estadio: req.params.id }, // Cambio de IdCalificacion a Id_Contrato
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } catch (err) {
    if (err instanceof ValidationError) {
      const messages = err.errors.map((x) => x.message);
      res.status(400).json(messages);
    } else {
      next(err);
    }
  }
});

module.exports = router;