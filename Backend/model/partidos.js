const { DataTypes } = require("sequelize");
const { sequelize } = require("../databases/sqlconect");
const Equipo = require('./equipos');


const Partidos = sequelize.define('Partidos', {
    Id_Partido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    Id_Equipo_Local: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: Equipo , key: 'Id_Equipo'},
        validate: {
            notEqual: function(value) {
            if (value === this.Id_Equipo_Visitante) {
                throw new Error('Id_Equipo_Local must be different from Id_Equipo_Visitante');
            }
            }
        }

    },
    Id_Equipo_Visitante: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: Equipo, key: 'Id_Equipo'}
    },
    Descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Fecha_del_Partido: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }

    },
    {
    timestamps: false
});

module.exports = Partidos;