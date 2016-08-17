const logger = require('../config/logger');
const User = require('./user.model');

module.exports = {
  search,
};

/***** PUBLIC *****/

function search(req, res) {
  const { q, limit = 5 } = req.query;
  if (!q) {
    return res.send([]);
  }
  const query = `${q}%`;

  return User.findAll({
    where: {
      $or: {
        fullName: { $ilike: query },
        email: { $ilike: query },
      },
    },
    limit,
    order: [['fullName', 'ASC']],
    attributes: ['id', 'fullName', 'email', 'photo'],
  })
  .then(users => res.send(users))
  .catch(err => {
    logger.debug('Error searching users ', q, err);
    res.status(400).send({ message: err.message });
  });
}
