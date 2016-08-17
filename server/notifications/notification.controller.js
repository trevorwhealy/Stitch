const logger = require('../config/logger');
const verify = require('../utils/verify');

const Notification = require('./notification.model');
const User = require('../users/user.model');
const Note = require('../notes/note.model');

module.exports = {
  getAll,
  markAsRead,
  markAllAsRead,
};

/***** PUBLIC *****/

function getAll(req, res) {
  const targetId = req.user.id;
  const { limit, offset } = req.query;
  const order = '"createdAt" DESC';

  const include = [
    { model: Note, attributes: ['name'] },
    { model: User, attributes: ['fullName'], foreignKey: 'sourceId', as: 'source' },
    { model: User, attributes: ['fullName'], foreignKey: 'targetId', as: 'target' },
  ];

  Notification.findAll({ where: { targetId }, limit, offset, order, include })
    .then(notifications => res.send(notifications))
    .catch(err => {
      logger.debug('Error fetching notifications ', err);
      res.status(500).send({ message: err.message });
    });
}

function markAsRead(req, res) {
  const id = req.params.id;
  const targetId = req.user.id;

  Notification.update({ isRead: true }, { where: { id, targetId } })
    .then(verify.transactionSuccess)
    .then(() => res.sendStatus(200))
    .catch(err => {
      logger.debug('Error updating notification status ', id, err);
      res.status(400).send({ message: err.message });
    });
}

function markAllAsRead(req, res) {
  const targetId = req.user.id;

  Notification.update({ isRead: true }, { where: { targetId } })
    .then(verify.transactionSuccess)
    .then(() => res.sendStatus(200))
    .catch(err => {
      logger.debug('Error updating notification status ', err);
      res.status(400).send({ message: err.message });
    });
}
