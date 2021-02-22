const Sequelize = require('sequelize');
require('dotenv').config()

const connection = new Sequelize(
    process.env.DB,
    process.env.USER_DB,
    process.env.PASSWORD_DB,
    {
        host: process.env.DB_HOST,
        dialect:'mysql',
        timezone:'-03:00'
    }
);

module.exports = connection;