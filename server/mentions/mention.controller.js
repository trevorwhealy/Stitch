const logger = require('../config/logger');
const verify = require('../utils/verify');
const Notification = require('../notifications/notification.model');

module.exports = {
  notifyUsers,
};

/***** PUBLIC *****/

function notifyUsers(req, res) {
  const users = req.body.users;
  const sourceId = req.user.id;
  const noteId = req.params.noteId;

  if (!users || users.length === 0) {
    return res.status(400).send({ message: 'User ID(s) required' });
  }

  res.sendStatus(200); // Always OK

  return verify.hasAccessToNote(noteId, sourceId)
    .then(() => {
      const data = users.map(targetId => ({ sourceId, targetId, noteId, type: 'MENTION' }));
      return Notification.bulkCreate(data);
    })
    .catch(logger.debug.bind(null, 'Error mentioning users ', users));
}
