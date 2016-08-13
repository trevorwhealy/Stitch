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
