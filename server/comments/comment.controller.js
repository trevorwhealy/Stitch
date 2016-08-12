const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
const logger = require('../config/logger');
// const checkTransactionSuccess = require('../utils/middleware').checkTransactionSuccess;

const Comment = require('./comment.model');
const User = require('../users/user.model');
// const Note = require('../users/note.model');

module.exports = {
  getAll,
  post,
  deleteOne,
};

/***** PUBLIC *****/

function getAll(req, res) {
  const noteId = req.param('noteId');
  Comment.findAll({
    where: {
      noteId,
    },
  })
  .then(comments => {
    res.send(comments);
  })
  .catch(err => {
    logger.debug('Error retrieving comments ', err);
    res.status(400).send({ message: err.message });
  });
}

function post(req, res) {
  const noteId = req.body.noteId;
  const userId = req.body.userId;
  const lineNumber = req.user.lineNumber;
  const text = req.user.text;

  Comment.create({
    noteId,
    userId,
    lineNumber,
    text,
  })
  .then(newComment => res.status(201).send(newComment))
  .catch(err => {
    logger.debug('Error creating comment ', err);
    res.status(400).send({ message: err.message });
  });
}

function deleteOne(req, res) {
  const id = req.params.id;
  const userId = req.user.id;
  Folder.destroy({ where: { id, userId } })
    .then(checkTransactionSuccess)
    .then(() => res.sendStatus(200))
    .catch(err => {
      logger.debug('Error deleting folder ', id, userId, err);
      res.status(400).send({ message: err.message });
    });
}
