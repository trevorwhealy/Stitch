import React from 'react';

const NewNote = ({ createNoteInFolder, folderId }) => (
  <div className="addNote" onClick={() => { createNoteInFolder(folderId); }}>
    <i className="material-icons">add_circle_outline
    </i>
  </div>
);

NewNote.propTypes = {
  createNoteInFolder: React.PropTypes.func,
  folderId: React.PropTypes.number,
};

export default NewNote;
