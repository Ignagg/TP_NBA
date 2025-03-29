const { DataTypes } = require("sequelize");
const { sequelize } = require("../databases/sqlconect");
const Estadios = require('./estadio');
const Entrenadores = require('./entrenadores');

const Equipo = sequelize.define('Equipos', {
    Id_Equipo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre_del_Equipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Fundado: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Id_Estadio: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Estadios,
            key: 'Id_Estadio'
        }
    },
    Id_Entrenador: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
        references: {
            model: Entrenadores,
            key: 'Id_Entrenador'
        }
    },
    Ciudad: {
        type: DataTypes.STRING,
        allowNull: false
    },
    },
    
{
    timestamps: false
});

module.exports = Equipo;
