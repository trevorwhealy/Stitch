const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const User = require('../users/user.model');
const Note = require('../notes/note.model');

const Comment = sequelize.define('comment', {
  text: {
    type: Sequelize.STRING,
    required: true,
  },
  lineNumber: {
    type: Sequelize.INTEGER,
    required: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    required: true,
  },
  noteId: {
    type: Sequelize.INTEGER,
    required: true,
  },
});

Comment.belongsTo(User);
Comment.belongsTo(Note);

module.exports = Comment;
