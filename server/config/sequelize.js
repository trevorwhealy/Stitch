const config = require('./config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.db, { logging: true });

sequelize.authenticate()
  .then(() => console.log('Database is connected'))
  .then(() => {
    require('../users/user.model');
    require('../folders/folder.model');
    require('../shares/share.model');
    require('../notes/note.model');
    require('../comments/comment.model');
    require('../permissions/permission.model');
  })
  .catch(err => console.error('DB Error: ', err));

module.exports = sequelize;
