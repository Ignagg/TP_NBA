const express = require('express');
const router = express.Router();
const Contratos = require('../model/contrato.js');
const { Op, ValidationError } = require("sequelize");


// Funcion para buscar por descripcion
const getByDescripcion = async (descripcion) => {
  try{
      const contratos = await Contratos.findAll({
          where: {
              Descripcion: {
                  [Op.like]: `%${descripcion}%`
              }
          }
      })
      return contratos
  }
  catch (error){
      console.log(error);
      return { error: error.message };
  }
}

// funcion para actualizar contrato
const actualizarContrato = async (Id_Contrato, body) => {
  const contratoAActualizar = await Contratos.findByPk(Id_Contrato)
  if (!contratoAActualizar) { 
      throw new Error("Error, no existe ese contrato")
  }

  if (!body.Id_Jugador || !body.Id_Equipo || !body.Fecha_de_Inicio || !body.Fecha_de_Fin || !body.Salario_Total || !body.Descripcion) {
      throw new Error("Error, falta algun dato")
  }

  contratoAActualizar.Id_Jugador = body.Id_Jugador
  contratoAActualizar.Id_Equipo = body.Id_Equipo
  contratoAActualizar.Fecha_de_Inicio = body.Fecha_de_Inicio
  contratoAActualizar.Fecha_de_Fin = body.Fecha_de_Fin
  contratoAActualizar.Salario_Total = body.Salario_Total
  contratoAActualizar.Descripcion = body.Descripcion

  await contratoAActualizar.save()
  return contratoAActualizar.dataValues
}


// GET ALL
router.get('/api/contratos', async function(req, res){
  try {
    let where = {};
    if (req.query.Id_Contrato != undefined && req.query.Id_Contrato !== "") {
      where.Id_Contrato = {
        [Op.like]: "%" + req.query.Id_Contrato.trim() + "%",
      };
    }

    const Pagina = parseInt(req.query.Pagina) || 1;
    const TamañoPagina = 40;

    const { count, rows } = await Contratos.findAndCountAll({
      attributes: ["Id_Contrato", "Id_Jugador", "Id_Equipo", "Fecha_de_Inicio", "Fecha_de_Fin", "Salario_Total", "Descripcion"], // Asumiendo que IdCalificacion se cambia a Id_Contrato
      order: [["Id_Contrato", "ASC"]],
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
router.get('/api/contratos/:id', async function (req, res, next) {
  let items = await Contratos.findOne({
    attributes: ["Id_Jugador", "Id_Equipo", "Fecha_de_Inicio", "Fecha_de_Fin", "Salario_Total", "Descripcion"],
    where: { Id_Contrato: req.params.id }, // Cambio de IdCalificacion a Id_Contrato
  });
  res.json(items);
});

// GET by descripcion
router.get('/api/contratos/descripcion/:descripcion', async function (req, res, next) {
  try {
    const contratos = await getByDescripcion(req.params.descripcion)
    return res.json(contratos)
} catch (error) {
    res.status(500).json({ error: "Error" })
}
});

// POST
router.post('/api/contratos/', async function (req, res, next){
  try {
    const data = await Contratos.create({
      Id_Jugador: req.body.Id_Jugador,
      Id_Equipo: req.body.Id_Equipo,
      Fecha_de_Inicio: req.body.Fecha_de_Inicio,
      Fecha_de_Fin: req.body.Fecha_de_Fin,
      Salario_Total: req.body.Salario_Total,
      Descripcion: req.body.Descripcion
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
router.put('/api/contratos/:id', async function (req, res, next) {
  try {
    const contratoActualizado = await actualizarContrato(req.params.id, req.body)
    return res.json(contratoActualizado)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
});


// DELETE By id
router.delete('/api/contratos/:id', async function (req, res, next) {
  try {
    let filasBorradas = await Contratos.destroy({
      where: { Id_Contrato: req.params.id }, // Cambio de IdCalificacion a Id_Contrato
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