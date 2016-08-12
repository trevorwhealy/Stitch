module.exports = {
  checkTransactionSuccess,
};

/***** PUBLIC *****/

function checkTransactionSuccess(numAffected) {
  if (numAffected === 0) {
    throw new Error('No folder found');
  }
}
