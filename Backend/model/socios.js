const { DataTypes } = require('sequelize');
const { sequelize } = require('../databases/sqlconect');
const Equipo = require('./equipos');

const Socio = sequelize.define('Socios', {
    Id_Socio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Id_Equipo: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references : {model: Equipo, key: 'Id_Equipo'}
    },
    Nombre: {
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
    Fecha_de_Afiliacion: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Edad: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    },
    {
    timestamps: false
});

module.exports = Socio;