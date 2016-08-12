const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const User = require('../users/user.model');
const Folder = require('../folders/folder.model');
const Share = require('../shares/share.model');

const Note = sequelize.define('note', {
  name: Sequelize.STRING,
  content: Sequelize.BLOB,
  userId: Sequelize.INTEGER,
  folderId: Sequelize.INTEGER,
});

Note.belongsTo(User);
Note.belongsTo(Folder);
Note.hasMany(Share);

module.exports = Note;
