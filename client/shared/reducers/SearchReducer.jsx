const intialSearchState = {
  files: [],
  searchComplete: false,
  statusMessage: '',
};

const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
const SEARCH_FAILURE = 'SEARCH_FAILURE';
const SEARCHING = 'SEARCHING';

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
        searchComplete: true,
        statusMessage: 'Search failed',
      });
    }
    case SEARCHING: {
      return Object.assign({}, state, {
        searchComplete: false,
        statusMessage: 'Searching',
      });
    }
    default: {
      return state;
    }
  }
};
