const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
const encryption = require('../utils/encryption');

const User = sequelize.define('user', {
  email: { type: Sequelize.STRING, required: true },
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

User.beforeCreate((user) => {
  if (!user.password) { return Promise.resolve(user); }
  return encryption.hashPassword(user.password)
    .then(hashedPw => {
      user.password = hashedPw;
    });
});

module.exports = User;
