const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const User = require('../users/user.model');
const Note = require('../notes/note.model');

const Alert = sequelize.define('alert', {
  userId: Sequelize.INTEGER,
  noteId: Sequelize.INTEGER,
  status: Sequelize.STRING,
  text: Sequelize.BLOB,
});

Alert.belongsTo(User);
Alert.belongsTo(Note);

Alert.sync();

module.exports = Alert;
