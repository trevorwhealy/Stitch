const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
const encryption = require('../utils/encryption');

const User = sequelize.define('user', {
  username: { type: Sequelize.STRING, required: true, unique: true },
  password: { type: Sequelize.STRING, required: true },
  fullName: { type: Sequelize.STRING, required: true },
  email: Sequelize.STRING,
  googleId: Sequelize.STRING,
  photo: Sequelize.STRING,
});

User.beforeCreate((user) => {
  return encryption.hashPassword(user.password)
    .then(hashedPw => {
      user.password = hashedPw;
    });
});

module.exports = User;
