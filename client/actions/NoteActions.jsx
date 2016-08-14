// import { browserHistory } from 'react-router';

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

export function getAllNotes() {
  const token = localStorage.getItem('jwtToken');
  return (dispatch) => {
    return fetch('/api/folders/5/notes', {
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

export function getOneNote(noteId) {
  const token = localStorage.getItem('jwtToken');

  return (dispatch) => {
    return fetch('/api/notes/:noteId', {
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
