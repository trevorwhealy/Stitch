// server
const express = require('express');
const app = express();
const config = require('./config/config');

// middleware
require('./config/express.js')(app, config);

// routes
require('./config/routes.js')(app);

app.listen(config.port, () => {
  console.log('Listening on port ' + config.port);
});

module.exports = app;
