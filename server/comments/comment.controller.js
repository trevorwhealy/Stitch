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
  put,
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
  const name = req.body.name;
  const userId = req.user.id;
  Folder.findAll({
    where: {
      $and: { name, userId },
    },
  })
    .then(folders => {
      if (folders.length > 0) { throw new Error('Duplicate folder name'); }
      return Folder.create({ name, userId });
    })
    .then(newFolder => res.status(201).send(newFolder))
    .catch(err => {
      logger.debug('Error creating folder ', err);
      res.status(400).send({ message: err.message });
    });
}

function put(req, res) {
  const id = req.params.id;
  const userId = req.user.id;
  Folder.update(req.body, { where: { id, userId } })
    .then(checkTransactionSuccess)
    .then(() => res.sendStatus(200))
    .catch(err => {
      logger.debug('Error updating folder ', id, userId, err);
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
