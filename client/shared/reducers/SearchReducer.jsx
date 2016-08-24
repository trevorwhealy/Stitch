const intialSearchState = {
  files: [],
  searchComplete: false,
  statusMessage: '',
};

const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
const SEARCH_FAILURE = 'SEARCH_FAILURE';

export default (state = intialSearchState, action) => {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return Object.assign({}, state, {
        files: action.files,
        searchComplete: true,
        statusMessage: 'Search success',
      });
    case SEARCH_FAILURE: {
      return Object.assign({}, state, {
        searchComplete: false,
        statusMessage: 'Search failed',
      });
    }
    default: {
      return state;
    }
  }
};
