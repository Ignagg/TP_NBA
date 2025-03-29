const { Sequelize } = require("sequelize");

   
const sequelize =  new Sequelize("db", "", "",{
    dialect: "sqlite",
    storage: "./databases/dbNBA.sqlite"

})

module.exports =  { sequelize };