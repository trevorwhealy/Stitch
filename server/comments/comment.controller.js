const logger = require('../config/logger');
const verify = require('../utils/verify');
const Comment = require('./comment.model');

module.exports = {
  getAll,
  post,
  put,
  deleteOne,
};

/***** PUBLIC *****/

function getAll(req, res) {
  const noteId = req.query.noteId;
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
  const userId = req.user.id;
  const { noteId, text, lineNumber } = req.body;

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

function put(req, res) {
  const id = req.params.id;
  const userId = req.user.id;

  Comment.update(req.body, { where: { id, userId } })
  .then(verify.transactionSuccess)
  .then(() => res.sendStatus(200))
  .catch(err => {
    logger.debug('Error updating comment ', id, userId, err);
    res.status(400).send({ message: err.message });
  });
}

function deleteOne(req, res) {
  const id = req.params.id;
  const userId = req.user.id;

  Comment.destroy({ where: { id, userId } })
    .then(verify.transactionSuccess)
    .then(() => res.sendStatus(200))
    .catch(err => {
      logger.debug('Error deleting folder ', id, userId, err);
      res.status(400).send({ message: err.message });
    });
}
