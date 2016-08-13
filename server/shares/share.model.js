const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const User = require('../users/user.model');

const Share = sequelize.define('share', {
  userId: { type: Sequelize.INTEGER, required: true },
  folderId: Sequelize.INTEGER,
  noteId: Sequelize.INTEGER,
});

Share.belongsTo(User);

module.exports = Share;
