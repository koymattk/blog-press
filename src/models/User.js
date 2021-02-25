const Sequelize = require('sequelize');
const connection = require('../database/connection');

const User = connection.define('user',{
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull:false
    },
    password:{
        type: Sequelize.STRING
    }
});

User.sync({force:false});


module.exports = User;
