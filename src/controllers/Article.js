const jwt = require("jsonwebtoken");
const Article = require("../models/Article");

const getAllArticles = async function(req, res) {
    try {
        const { token } = req.headers;
        const isValid = jwt.verify(token, 'NotSoSecret', {algorithm: 'HS256'});
        if(isValid) {
            const articles = await Article.findAll();
            res.status(200).send({articles: articles});
        } else {
            res.status(401).send({ message: "Invalid token." });
        }
    } catch(err) {
        res.status(500).send({ message: "Something wrong happened. Please try again.", error: err });
    }
};

const createArticle = async function (req, res) {
    try {
        const { token } = req.headers;
        const { title, author, summary, link } = req.body;
        const isValid = await jwt.verify(token, 'NotSoSecret', {algorithm: 'HS256'});
        if(isValid) {
            const newArticle = new Article({ title: title, author: author, summary: summary, link: link });
            await newArticle.save();
            res.status(201).send({ message: "Article has been posted successfully!", article: newArticle });
        } else {
            res.status(401).send({ message: "Invalid token." });
        }
    } catch (err) {
        res.status(500).send({ message: "Something wrong happened. Please try again.", error: err });
    }
};

const updateArticle = async function(req, res) {
    try {
        const { token } = req.headers;
        const { id } = req.params;
        const { title: title, author: author, summary: summary, link: link } = req.body;
        const isValid = await jwt.verify(token, 'NotSoSecret', {algorithm: 'HS256'});
        if(isValid) {
            const article = await Article.update({ title: title, author: author, summary: summary, link: link }, {where: {id: id}});
            article.save();
            res.status(200).send({ message: "Article has been updated successfully!", article: article });
        } else {
            res.status(401).send({ message: "Invalid token." });
        }
    } catch (err) {
        res.status(500).send({ message: "Something wrong happened. Please try again.", error: err });
    }
};

const deleteArticle = async function(req, res) {
    try {
        const { token } = req.headers;
        const { id } = req.params;
        const isValid = jwt.verify(token, 'NotSoSecret', {algorithm: 'HS256'});
        if (isValid) {
            const article = await Article.destroy({where: {id: id}});
            res.send({ message: "Article has been removed successfully!", article: article._id});
        } else {
            res.status(401).send({ message: "Invalid token." });
        }
    } catch (err) {
        res.status(500).send({ message: "Something wrong happened. Please try again.", error: err });
    }
};

module.exports = {
    getAllArticles,
    createArticle,
    updateArticle,
    deleteArticle
};