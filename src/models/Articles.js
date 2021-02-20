const Sequelize = require('sequelize');
const connection = require('../database/connection');
const Category = require('../models/Categories');

const Article = connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull:false
    }
});

//relacionamentos
Category.hasMany(Article); // um para muitos
Article.belongsTo(Category); //um artigo pertence a uma categoria

module.exports = Article;
