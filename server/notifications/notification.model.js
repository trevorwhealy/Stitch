const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const User = require('../users/user.model');
const Note = require('../notes/note.model');

const Notification = sequelize.define('notification', {
  userId: Sequelize.INTEGER,
  noteId: Sequelize.INTEGER,
  status: Sequelize.ENUM('READ', 'UNREAD'),
  text: Sequelize.BLOB,
});

Notification.belongsTo(User);
Notification.belongsTo(Note);

module.exports = Notification;
