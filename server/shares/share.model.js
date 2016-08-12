const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const User = require('../users/user.model');
// const Folder = require('../folders/folder.model');
// const Note = require('../notes/note.model');

const Share = sequelize.define('share', {
  userId: Sequelize.INTEGER,
  folderId: Sequelize.INTEGER,
  noteId: Sequelize.INTEGER,
});

Share.belongsTo(User);
// Share.belongsTo(Folder);
// Share.belongsTo(Note);

module.exports = Share;
