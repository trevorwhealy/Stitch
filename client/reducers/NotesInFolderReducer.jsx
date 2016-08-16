const notesInFolderState = {
  notes: [],
  notesReceived: false,
  statusMessage: '',
};

const GET_ALL_NOTES_IN_FOLDER = 'GET_ALL_NOTES_IN_FOLDER';
const GET_NOTES_FAILURE = 'GET_NOTES_FAILURE';

export default (state = notesInFolderState, action) => {
  switch (action.type) {
    case GET_ALL_NOTES_IN_FOLDER:
      return Object.assign({}, state, {
        notes: action.notes,
        notesReceived: true,
        statusMessage: 'Notes received',
      });
    case GET_NOTES_FAILURE: {
      return Object.assign({}, state, {
        notesReceived: false,
        statusMessage: 'Notes not received',
      });
    }
    default: {
      return state;
    }
  }
};
