const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
const encryption = require('../utils/encryption');

const User = sequelize.define('user', {
  email: { type: Sequelize.STRING, required: true, unique: true },
  password: { type: Sequelize.STRING },
  fullName: { type: Sequelize.STRING, required: true },
  googleId: Sequelize.STRING,
  photo: Sequelize.STRING,
}, {
  indexes: [
    { method: 'BTREE', fields: ['fullName'] },
    { method: 'BTREE', fields: ['email'] },
  ],
});

module.exports = User;

User.beforeCreate((user) => {
  if (!user.password) { return Promise.resolve(user); }
  return encryption.hashPassword(user.password)
    .then(hashedPw => {
      user.password = hashedPw;
    });
});

// Create welcome folder after new user is created
const onboard = require('../onboard/onboard.service');

User.afterCreate((user) => {
  if (!user || !user.id) { return; }
  onboard.createWelcomeFolder(user.id);
});
