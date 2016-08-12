const config = require('./config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.db, { logging: true });

module.exports = sequelize;

/* Models */
require('../users/user.model');
require('../folders/folder.model');
require('../shares/share.model');
require('../notes/note.model');
require('../permissions/permission.model');
require('../comments/comment.model');

sequelize.authenticate()
  .then(() => console.log('Database is connected'))
  .then(() => {
    if (process.env.NODE_ENV !== 'production') {
      /* eslint-disable global-require */
      require('../seeds');
      /* eslint-enable global-require */
    }
  })
  .then(() => sequelize.sync())
  .catch(err => console.error('DB Error: ', err));
