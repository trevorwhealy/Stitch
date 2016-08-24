const intialFolderState = {
  folder: [],
  foldersReceived: false,
  statusMessage: '',
};

const FOLDER_SUCCESS = 'FOLDER_SUCCESS';
const FOLDER_FAILURE = 'FOLDER_FAILURE';

export default (state = intialFolderState, action) => {
  switch (action.type) {
    case FOLDER_SUCCESS:
      return Object.assign({}, state, {
        folder: action.folders,
        foldersReceived: true,
        statusMessage: 'Folders received',
      });
    case FOLDER_FAILURE: {
      return Object.assign({}, state, {
        foldersReceived: false,
        statusMessage: 'Folders not received',
      });
    }
    default: {
      return state;
    }
  }
};
