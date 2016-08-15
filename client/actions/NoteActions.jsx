export function notesSuccess(notes) {
  return {
    type: 'GET_NOTES_SUCCESS',
    notes,
  };
}

export function notesFailure(message) {
  return {
    type: 'GET_NOTES_FAILURE',
    message,
  };
}

export function receiveSingleNote(note) {
  return {
    type: 'GET_SINGLE_NOTE_SUCCESS',
    note,
  };
}

export function receiveNotesInFolder(notes) {
  return {
    type: 'GET_ALL_NOTES_IN_FOLDER',
    notes,
  };
}

// Get all the notes that user has
export function getAllNotes() {
  const token = localStorage.getItem('jwtToken');
  return (dispatch) => {
    return fetch('/api/notes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    })
    .then(res => res.json())
    .then(data => {
      dispatch(notesSuccess(data));
    })
    .catch(err => {
      dispatch(notesFailure(err));
    });
  };
}

// Get a specific note that the user requested
export function getOneNote(noteId) {
  const token = localStorage.getItem('jwtToken');

  return (dispatch) => {
    return fetch(`/api/notes/${noteId}`, {
      method: 'GET',
      body: {
        params: JSON.stringify(noteId),
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    })
    .then(res => res.json())
    .then(data => {
      dispatch(receiveSingleNote(data));
    })
    .catch(err => {
      dispatch(notesFailure(err));
    });
  };
}

// Get all notes in a specific folder
export function getNotesInFolder(folderId) {
  const token = localStorage.getItem('jwtToken');

  return (dispatch) => {
    return fetch(`/api/notes/${folderId}`, {
      method: 'GET',
      body: {
        params: JSON.stringify(folderId),
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    })
    .then(res => res.json())
    .then(data => {
      dispatch(receiveNotesInFolder(data));
    })
    .catch(err => {
      dispatch(notesFailure(err));
    });
  };
}

// export function updateNote(noteId) {
//   const token = localStorage.getItem('jwtToken');
//
//   return (dispatch) => {
//     return fetch('/api/notes/:noteId', {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `JWT ${token}`,
//       },
//     })
//     .catch(err => {
//       console.log(err);
//     });
//   };
// }
