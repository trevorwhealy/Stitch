const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const User = require('../users/user.model');
const Note = require('../notes/note.model');

const Notification = sequelize.define('notification', {
  sourceId: Sequelize.INTEGER,
  targetId: { type: Sequelize.INTEGER, required: true },
  noteId: Sequelize.INTEGER,
  isRead: {
    type: Sequelize.BOOLEAN,
    required: true,
    defaultValue: false,
  },
  type: Sequelize.STRING(30), // NOTE: Sequelize ENUM broken for postgres dialect
  text: Sequelize.STRING,
});

module.exports = Notification;

Notification.belongsTo(User, { as: 'source', foreignKey: 'sourceId' });
Notification.belongsTo(User, { as: 'target', foreignKey: 'targetId' });
Notification.belongsTo(Note);
