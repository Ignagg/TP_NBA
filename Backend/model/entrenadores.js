const { DataTypes } = require("sequelize");
const { sequelize } = require("../databases/sqlconect");

const Entrenador = sequelize.define('Entrenadores', {
    Id_Entrenador: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre_del_Entrenador: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Fecha_de_Nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
    },
    {
    timestamps: false
});

module.exports = Entrenador;