const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const User = require('../users/user.model');
const Note = require('../notes/note.model');

const Permission = sequelize.define('permission', {
  userId: Sequelize.INTEGER,
  noteId: Sequelize.INTEGER,
  permission: Sequelize.STRING,
});

Permission.belongsTo(User);
Permission.belongsTo(Note);

module.exports = Permission;
