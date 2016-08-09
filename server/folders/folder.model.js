const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const User = require('../users/user.model')

const Folder = sequelize.define('folder', {
  name: Sequelize.STRING,
  userId: Sequelize.INTEGER,
})

Folder.belongsTo(User);

Folder.sync();

module.exports = Folder;