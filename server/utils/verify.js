module.exports = {
  transactionSuccess,
};

/***** PUBLIC *****/

function transactionSuccess(numAffected) {
  if (numAffected === 0) {
    throw new Error('Not found');
  }
}
