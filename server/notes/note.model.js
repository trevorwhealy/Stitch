const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const User = require('../users/user.model');
const Folder = require('../folders/folder.model');
const Share = require('../shares/share.model');

const Note = sequelize.define('note', {
  name: { type: Sequelize.STRING, defaultValue: 'Untitled' },
  content: Sequelize.BLOB,
  userId: { type: Sequelize.INTEGER, required: true },
  folderId: { type: Sequelize.INTEGER, required: true },
});

Note.belongsTo(User);
Note.belongsTo(Folder);
Note.hasMany(Share);

module.exports = Note;
