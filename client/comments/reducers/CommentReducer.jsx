const commentState = {
  comment: [],
  commentReceived: false,
  statusMessage: '',
};

const GET_COMMENT_SUCCESS = 'GET_COMMENT_SUCCESS';
const GET_COMMENT_FAILURE = 'GET_COMMENT_FAILURE';

export default (state = commentState, action) => {
  switch (action.type) {
    case GET_COMMENT_SUCCESS:
      return Object.assign({}, state, {
        comment: action.comment,
        commentReceived: true,
        statusMessage: 'Comments received',
      });
    case GET_COMMENT_FAILURE: {
      return Object.assign({}, state, {
        commentReceived: false,
        statusMessage: 'Comments not received',
      });
    }
    default: {
      return state;
    }
  }
};
