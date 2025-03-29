// configurar ORM sequelize
const { DataTypes } = require("sequelize");
const { sequelize } = require("../databases/sqlconect");
const Equipo = require('./equipos');
// definicion del modelo de datos
// Jugadores
const Jugador = sequelize.define(
  "Jugadores",
  {
    Id_Jugadores: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre_del_Jugador: {
      // todo evitar que string autocomplete con espacios en blanco, debería ser varchar sin espacios
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [5, 50],
          msg: "Nombre debe ser tipo caracteres, entre 5 y 50 de longitud",
        },
      },
    },
    Id_Equipo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {model: Equipo, key: 'Id_Equipo'}
    },
    Fecha_de_Nacimiento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    timestamps: false 
  }
);
module.exports = Jugador;
