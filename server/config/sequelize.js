const config = require('./config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.db, { logging: true });

sequelize.authenticate()
  .then(() => console.log('Database is connected'))
  .catch(err => console.error('DB Error: ', err));

module.exports = sequelize;
