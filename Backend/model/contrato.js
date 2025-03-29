const { DataTypes } = require("sequelize");
const { sequelize } = require("../databases/sqlconect");
const Jugador = require('./jugadores');
const Equipos = require('./equipos');

const Contrato = sequelize.define('Contratos', {
    Id_Contrato: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Fecha_de_Inicio: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Fecha_de_Fin: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Id_Jugador: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Jugador,
            key: 'Id_Jugador'
        }
    },
    Id_Equipo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Equipos,
            key: 'Id_Equipo'
        }
    },
    Salario_Total: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    },
    {
    timestamps: false
    
});

module.exports = Contrato;