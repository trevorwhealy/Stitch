const noteState = {
  notes: [],
  notesRecieved: false,
  statusMessage: '',
};

const GET_NOTES_SUCCESS = 'GET_NOTES_SUCCESS';
const GET_NOTES_FAILURE = 'GET_NOTES_FAILURE';

export default (state = noteState, action) => {
  switch (action.type) {
    case GET_NOTES_SUCCESS:
      return Object.assign({}, state, {
        note: action.notes,
        notesRecieved: true,
        statusMessage: 'Notes received',
      });
    case GET_NOTES_FAILURE: {
      return Object.assign({}, state, {
        notesRecieved: false,
        statusMessage: 'Notes not received',
      });
    }
    default: {
      return state;
    }
  }
};
