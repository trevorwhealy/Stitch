const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const User = require('../users/user.model');
const Share = require('../shares/share.model');

const Folder = sequelize.define('folder', {
  name: Sequelize.STRING,
  userId: Sequelize.INTEGER,
});

Folder.belongsTo(User);
Folder.hasMany(Share);

module.exports = Folder;
