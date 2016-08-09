// server
const express = require('express');

const app = express();

const config = require('./config/config');

require('./config/express')(app, config);
require('./config/routes')(app);

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});

module.exports = app;
