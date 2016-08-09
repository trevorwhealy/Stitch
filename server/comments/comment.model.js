const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const User = require('../users/user.model');
const Note = require('../notes/note.model');

const Comment = sequelize.define('comment', {
  text: Sequelize.BLOB,
  lineNumber: Sequelize.INTEGER,
  userId: Sequelize.INTEGER,
  noteId: Sequelize.INTEGER,
});

Comment.belongsTo(User);
Comment.belongsTo(Note);

Comment.sync();

module.exports = Comment;
