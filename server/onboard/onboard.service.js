const logger = require('../config/logger');
const Folder = require('../folders/folder.model');
const Note = require('../notes/note.model');

const notes = require('./onboard.data');

module.exports = {
  createWelcomeFolder,
};

/***** PUBLIC *****/

function createWelcomeFolder(userId) {
  Folder.create({ name: 'Welcome to Stitch', userId })
    .then(newFolder => {
      notes.forEach(note => {
        note.userId = userId;
        note.folderId = newFolder.id;
        return note;
      });
      return Note.bulkCreate(notes);
    })
    .catch(err => logger.error('Error created welcome folder ', err));
}
