// server
const express = require('express');
const https = require('https');
const fs = require('fs');

const config = require('./config/config');

const app = express();

const options = {};

require('./config/logger');
require('./config/sequelize');
require('./config/passport');
require('./config/express')(app, config);
require('./config/routes')(app, config);

const listeningOnPort = `Listening on port ${config.port}`;

if (process.env.NODE_ENV === 'production') {
  options.key = fs.readFileSync('key.pem');
  options.cert = fs.readFileSync('cert.pem');
  https.createServer(options, app).listen(config.port, () => {
    console.log(listeningOnPort);
  });
} else {
  app.listen(config.port, () => console.log(listeningOnPort));
}

module.exports = app;
