const singleNoteState = {
  note: {},
  notePending: false,
};

const GET_SINGLE_NOTE_SUCCESS = 'GET_SINGLE_NOTE_SUCCESS';
const GET_SINGLE_NOTE_FAILURE = 'GET_SINGLE_NOTE_FAILURE';
const GET_SINGLE_NOTE_PENDING = 'GET_SINGLE_NOTE_PENDING';

export default (state = singleNoteState, action) => {
  switch (action.type) {
    case GET_SINGLE_NOTE_SUCCESS :
      return Object.assign({}, state, {
        note: action.note,
        notePending: false,
      });
    case GET_SINGLE_NOTE_FAILURE :
      return Object.assign({}, state, {
        note: {},
        notePending: false,
      });
    case GET_SINGLE_NOTE_PENDING: {
      return Object.assign({}, state, {
        notePending: true,
      });
    }
    default: {
      return state;
    }
  }
};
