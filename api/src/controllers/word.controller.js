const wordService = require('../services/word.service');

const uniqueWords = async(request, response) => {
    const wordResponse = await wordService.uniqueWords();
    response.status(wordResponse.status);
    response.send(wordResponse);
};

const wordCount = async(request, response) => {
    const type = request.params.type;
    const word = request.params.word;
    const wordResponse = await wordService.wordCount(type, word);
    response.status(wordResponse.status);
    response.send(wordResponse);
};

const wordRanks = async(request, response) => {
    const range = request.params.range;
    const wordResponse = await wordService.wordRanks(range);
    response.status(wordResponse.status);
    response.send(wordResponse);
};

module.exports = { uniqueWords, wordCount, wordRanks };