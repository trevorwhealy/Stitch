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

const listeningOnPort = 'Listening on port';

if (process.env.NODE_ENV === 'production') {
  options.key = fs.readFileSync(__dirname + '/privkey.pem');
  options.cert = fs.readFileSync(__dirname + '/fullchain.pem');
  options.ca = fs.readFileSync(__dirname + '/chain.pem');
  https.createServer(options, app).listen(443, () => {
    console.log(listeningOnPort, 443);
  });
}
app.listen(config.port, () => console.log(listeningOnPort, config.port));

module.exports = app;
