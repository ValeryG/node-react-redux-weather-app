const winston = require('winston');

const logger = new winston.Logger({
  level: process.env['NODE_ENV'] === 'production' ? 'info' : 'debug',
  transports: [
    new (winston.transports.Console)()
  ]
});

module.exports = logger;
