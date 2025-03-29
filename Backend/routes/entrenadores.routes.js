const express = require('express');
const router = express.Router();
const Entrenadores = require('../model/entrenadores.js');
const { Op, ValidationError } = require("sequelize");

// Funcion para buscar por nombre
const getByNombre = async (nombre) => {
  try{
      const entrenadores = await Entrenadores.findAll({
          where: {
              Nombre_del_Entrenador: {
                  [Op.like]: `%${nombre}%`
              }
          }
      })
      return entrenadores
  }
  catch (error){
      console.log(error);
      return { error: error.message };
  }
}

// funcion para actualizar entrenador
const actualizarEntrenador = async (Id_Entrenador, body) => {
  const entrenadorAActualizar = await Entrenadores.findByPk(Id_Entrenador)
  if (!entrenadorAActualizar) { 
      throw new Error("Error, no existe ese entrenador")
  }

  if (!body.Nombre_del_Entrenador || !body.Fecha_de_Nacimiento) {
      throw new Error("Error, falta algun dato")
  }

  entrenadorAActualizar.Nombre_del_Entrenador = body.Nombre_del_Entrenador
  entrenadorAActualizar.Fecha_de_Nacimiento = body.Fecha_de_Nacimiento

  await entrenadorAActualizar.save()
  return entrenadorAActualizar.dataValues
}

// GET ALL
router.get("/api/entrenadores", async function (req, res, next) {
  try {
    let where = {};
    if (req.query.Id_Entrenador != undefined && req.query.Id_Entrenador !== "") {
      where.Id_Entrenador = {
        [Op.like]: "%" + req.query.Id_Entrenador.trim() + "%",
      };
    }
    const Pagina = parseInt(req.query.Pagina) || 1;
    const TamañoPagina = 40;

    const { count, rows } = await Entrenadores.findAndCountAll({
      attributes: [
        "Id_Entrenador",
        "Fecha_de_Nacimiento",
        "Nombre_del_Entrenador",
      ],
      order: [["Id_Entrenador", "ASC"]],
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
router.get("/api/entrenadores/:id", async function (req, res) {
  let items = await Entrenadores.findOne({
    attributes: [
      "Id_Entrenador",
      "Fecha_de_Nacimiento",
      "Nombre_del_Entrenador",
    ],
    where: { Id_Entrenador: req.params.id },
  });
  res.json(items);
});


// GET BY NOMBRE
router.get('/api/entrenadores/nombre/:nombre', async function (req, res) {
  try {
      const entrenadores = await getByNombre(req.params.nombre)
      return res.json(entrenadores)
  } catch (error) {
      res.status(500).json({ error: "Error" })
  }
});

// POST
router.post("/api/entrenadores/", async (req, res) => {
  try {
    let data = await Entrenadores.create({
      Fecha_de_Nacimiento: req.body.Fecha_de_Nacimiento,
      Nombre_del_Entrenador: req.body.Nombre_del_Entrenador
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
router.put("/api/entrenadores/:id", async (req, res) => {
  try {
    const entrenadorActualizado = await actualizarEntrenador(req.params.id, req.body)
    return res.json(entrenadorActualizado)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
});

// DELETE
router.delete("/api/entrenadores/:id", async (req, res) => {
  // #swagger.tags = ['entrenadores']
  // #swagger.summary = 'elimina un entrenadores'
  // #swagger.parameters['id'] = { description: 'identificador del entrenadores..' }
  try {
    let filasBorradas = await Entrenadores.destroy({
      where: { Id_Entrenador: req.params.id },
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