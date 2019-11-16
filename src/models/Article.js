const Sequelize = require("sequelize");
const sequelize = require("../../connection");
const Article = sequelize.define('article', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    },
    summary: {
        type: Sequelize.STRING,
        allowNull: false
    },
    link: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
})

module.exports = Article;