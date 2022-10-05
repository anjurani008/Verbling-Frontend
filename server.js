/*
Put content of angular2 build into 'public' folder.
*/
const html = './dist/verblingFrontend/';

const port = 4782;
const apiUrl = '/api';

// Express
const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
var app = express();

app
    .use(compression())
    .use(bodyParser.json())
    // Static content
    .use(express.static(html))
    // Default route
    .use(function (req, res) {
        res.sendFile(__dirname + '/dist/verblingFrontend/index.html');
    })
    // Start server
    .listen(port, function () {
        console.log('Port: ' + port);
        console.log('Html: ' + html);
    });
