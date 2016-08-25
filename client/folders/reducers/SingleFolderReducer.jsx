const singleFolderState = {
  folder: {},
  foldersReceived: false,
  statusMessage: '',
};

const GET_ONE_FOLDER = 'GET_ONE_FOLDER';
const FOLDER_FAILURE = 'FOLDER_FAILURE';
const RESET_ONE_FOLDER_STATE = 'RESET_ONE_FOLDER_STATE';

export default (state = singleFolderState, action) => {
  switch (action.type) {
    case GET_ONE_FOLDER:
      return Object.assign({}, state, {
        folder: action.folder,
        foldersReceived: true,
        statusMessage: 'Folder received',
      });
    case FOLDER_FAILURE:
      return Object.assign({}, state, {
        foldersReceived: false,
        statusMessage: 'Folder not received',
      });
    case RESET_ONE_FOLDER_STATE:
      return Object.assign({}, state, {
        folder: {},
        foldersReceived: false,
        statusMessage: 'On home page',
      });
    default: {
      return state;
    }
  }
};
