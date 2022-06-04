const https = require('https');
const synonyms = require("synonyms");
const unique = require('unique-words');
const responses = require('../utils/response.util');

const url = 'https://norvig.com/big.txt';

const readFileFromURL = async(url) => {
    try {
        return new Promise((resolve, reject) => {
            https.get(url, (resp) => {
                let data = '';
                resp.on('data', i => data += i);
                resp.on('end', () => resolve(data));
            }).on("error", err => reject(err));
        });
    } catch (exc) {
        console.error('Exception @ readFileFromURL', exc);
        throw exc;
    }
}

const uniqueWords = async() => {
    try {
        const content = await readFileFromURL(url);
        const count = unique(content).length;
        return responses.setSuccessResponse({ count });
    } catch (exc) {
        console.error('Exception @ uniqueWords', exc);
        return responses.setErrorResponse(exc);
    }
};

const wordCount = async(type, word) => {
    try {
        const content = await readFileFromURL(url);
        let count = 0;
        if (word && type && type.toLowerCase() === 'synonyms') {
            let synonymsList = synonyms(word);
            synonymsList = Object.values(synonymsList).flat(1);
            if (synonymsList && synonymsList.length > 0) {
                synonymsList.forEach(synonymItem => count = count + (unique.counts(content)[synonymItem] || 0));
            }
        } else if (word && type && type.toLowerCase() === 'word') {
            count = unique.counts(content)[word] || 0;
        } else {
            return responses.setErrorResponse({ 'reason': '\'type\' and \'word\' have to be specified' });
        }
        return responses.setSuccessResponse({ count });
    } catch (exc) {
        console.error('Exception @ wordCount', exc);
        return responses.setErrorResponse(exc);
    }
};

const wordRanks = async(range) => {
    try {
        if (range > 0) {
            const content = await readFileFromURL(url);
            let data = unique.counts(content);
            data = transformNumbersToStrings(data);
            data = sortByValuesDesc(data);
            data = sliceObjectByRange(data, range);
            return responses.setSuccessResponse(data);
        }
        return responses.setErrorResponse({ 'reason': '\'range\' has to be specified' });
    } catch (exc) {
        console.error('Exception @ wordRanks', exc);
        return responses.setErrorResponse(exc);
    }
};

const transformNumbersToStrings = (object) => {
    let items = Object.entries(object);
    items.forEach((item, index) => items[index][0] = isNaN(item[0]) ? item[0] : `#${item[0]}`);
    return Object.fromEntries(items);
};

const sortByValuesDesc = (object) => Object.fromEntries(Object.entries(object).sort((a, b) => b[1] - a[1]));

const sliceObjectByRange = (object, range) => {
    let items = Object.entries(object);
    items = items.slice(0, range);
    return Object.fromEntries(items);
}

module.exports = { uniqueWords, wordCount, wordRanks };