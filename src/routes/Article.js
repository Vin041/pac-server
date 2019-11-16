const express = require('express');
const router = express.Router();
const articleController = require('../../src/controllers/Article');

router.get('/', function(req, res){ articleController.getAllArticles(req, res) });
router.post('/create', function(req, res){ articleController.createArticle(req, res)});
router.put('/article/:id', function(req, res) { articleController.updateArticle(req, res)});
router.delete('/article/:id', function(req, res) { articleController.deleteArticle(req, res)});

module.exports = router;