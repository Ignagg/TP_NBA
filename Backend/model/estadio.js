const { DataTypes } = require("sequelize");
const { sequelize } = require("../databases/sqlconect");

const Estadio = sequelize.define('Estadios', {
    Id_Estadio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre_del_Estadio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Fecha_de_Inauguración: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Ciudad: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Capacidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
},
{
    timestamps: false
});

module.exports = Estadio;