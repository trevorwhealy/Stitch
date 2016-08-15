const singleNoteState = {
  note: {},
};

const GET_SINGLE_NOTE_SUCCESS = 'GET_SINGLE_NOTE_SUCCESS';

export default (state = singleNoteState, action) => {
  switch (action.type) {
    case GET_SINGLE_NOTE_SUCCESS :
      return Object.assign({}, state, {
        note: action.note,
      });
    default: {
      return state;
    }
  }
};
