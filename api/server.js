const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const port = 3000;
const router = require('./src/routers/app.router');

const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use('/v1/data-analysis', router);

app.use((request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.status(404).json('Not found');
});

app.use((error, request, response, next) => {
    if (error) console.error(error);
    response.setHeader('Content-Type', 'application/json');
    response.status(error.status).json({ message: error.message });
});

const server = require('http').createServer(app);

server.listen(port);

server.on('listening', () => {
    console.info('App listening on port ' + port);
});

server.on('error', error => {
    console.error('Error occured while starting the server :: ' + error);
});

module.exports = app;