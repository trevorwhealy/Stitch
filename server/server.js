// server
const express = require('express');

const app = express();

const config = require('./config/config');

// middleware
require('./config/express')(app, config);

// routes
require('./config/routes')(app);

app.listen(config.port, () => {
  console.log('Listening on port ' + config.port);
});

module.exports = app;
