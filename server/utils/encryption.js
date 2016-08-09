const Promise = require('bluebird').Promise;
const bcrypt = require('bcrypt');

Promise.promisifyAll(bcrypt, { context: bcrypt });

module.exports = {
  hashPassword,
  comparePassword,
};

/***** PUBLIC *****/

function hashPassword(password) {
  return bcrypt.genSaltAsync(10)
    .then(salt => bcrypt.hashAsync(password, salt));
}

function comparePassword(password, hashedPassword) {
  return bcrypt.compareAsync(password, hashedPassword);
}
