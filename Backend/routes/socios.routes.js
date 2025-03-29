const express = require('express');
const router = express.Router();
const Socios = require('../model/socios.js');
const { Op, ValidationError } = require("sequelize");

// Funcion para buscar por nombre
const getByNombre = async (nombre) => {
  try{
      const socios = await Socios.findAll({
          where: {
              Nombre: {
                  [Op.like]: `%${nombre}%`
              }
          }
      })
      return socios
  }
  catch (error){
      console.log(error);
      return { error: error.message };
  }
};

// funcion para actualizar equipo
const actualizarEquipo = async (Id_Equipo, body) => {
  const clubAActualizar = await Socios.findByPk(Id_Equipo)
  if (!clubAActualizar) { 
      throw new Error("Error, no existe ese equipo")
  }

  if (!body.Nombre || !body.Fecha_de_Afiliacion || !body.Edad || !body.Id_Equipo) {
      throw new Error("Error, falta algun dato")
  }

  clubAActualizar.Nombre = body.Nombre
  clubAActualizar.Fecha_de_Afiliacion = body.Fecha_de_Afiliacion
  clubAActualizar.Edad = body.Edad
  clubAActualizar.Id_Equipo = body.Id_Equipo

  await clubAActualizar.save()
  return clubAActualizar.dataValues
}

// GET ALL
router.get("/api/socios", async function (req, res, next) {
  try {
    let where = {};
    if (req.query.Id_Socio != undefined && req.query.Id_Socio !== "") {
      where.Id_Socio = {
        [Op.like]: "%" + req.query.Id_Socio.trim() + "%",
      };
    }
    const Pagina = parseInt(req.query.Pagina) || 1;
    const TamañoPagina = 40;

    const { count, rows } = await Socios.findAndCountAll({
      attributes: [
        "Id_Socio",
        "Id_Equipo",
        "Nombre",
        "Fecha_de_Afiliacion",
        "Edad"
      ],
      order: [["Id_Socio", "ASC"]],
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
router.get("/api/socios/:id", async function (req, res, next) {
  let items = await Socios.findOne({
    attributes: [
      "Id_Socio",
      "Id_Equipo",
      "Nombre",
      "Fecha_de_Afiliacion",
      "Edad"
    ],
    where: { Id_Socio: req.params.id },
  });
  res.json(items);
});

// GET BY NOMBRE
router.get("/api/socios/nombre/:nombre", async function (req, res, next) {
  try {
    const socios = await getByNombre(req.params.nombre)
    return res.json(socios)
} catch (error) {
    res.status(500).json({ error: "Error" })
}
});

router.post("/api/socios/", async (req, res) => {
  try {
    let data = await Socios.create({
      Id_Equipo : req.body.Id_Equipo,
      Nombre : req.body.Nombre,
      Fecha_de_Afiliacion : req.body.Fecha_de_Afiliacion,
      Edad : req.body.Edad
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

router.put("/api/socios/:id", async (req, res) => {
  try {
      const equipo = await actualizarEquipo(req.params.id, req.body)
      res.json(equipo)
  } catch (error) {
      res.status(500).json({ error: "Error" })
  }
});

router.delete("/api/socios/:id", async (req, res) => {
  // #swagger.tags = ['equipos']
  // #swagger.summary = 'elimina un equipos'
  // #swagger.parameters['id'] = { description: 'identificador del equipos..' }
  try {
    let filasBorradas = await Socios.destroy({
      where: { Id_Socio: req.params.id },
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