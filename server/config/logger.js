const winston = require('winston');
const config = require('./config');

winston.level = config.logLevel;

module.exports = winston;
