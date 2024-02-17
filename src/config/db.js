const sequelize = require("sequelize");
require("dotenv").config();

const db = new sequelize.Sequelize({
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: "mysql"
})

module.exports = db;