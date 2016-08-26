import React from 'react';

const NewNote = ({ createNoteInFolder, folderId }) => (
  <div className="newNoteBtn" onClick={() => { createNoteInFolder(folderId); }}>
    <i className="material-icons">add</i>
    <span>New note</span>
  </div>
);

NewNote.propTypes = {
  createNoteInFolder: React.PropTypes.func,
  folderId: React.PropTypes.string,
};

export default NewNote;
