const app = require('express').Router();
const wordController = require('../controllers/word.controller');

app.get('/unique-words', async(request, response) => {
    await wordController.uniqueWords(request, response);
});

app.get('/:type/:word/count', async(request, response) => {
    await wordController.wordCount(request, response);
});

app.get('/words/rank/:range', async(request, response) => {
    await wordController.wordRanks(request, response);
});

module.exports = app;