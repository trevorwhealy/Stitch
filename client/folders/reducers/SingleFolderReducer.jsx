const singleFolderState = {
  folder: {},
  foldersReceived: false,
  statusMessage: '',
};

const GET_ONE_FOLDER = 'GET_ONE_FOLDER';
const FOLDER_FAILURE = 'FOLDER_FAILURE';

export default (state = singleFolderState, action) => {
  switch (action.type) {
    case GET_ONE_FOLDER:
      return Object.assign({}, state, {
        folder: action.folder,
        foldersReceived: true,
        statusMessage: 'Folder received',
      });
    case FOLDER_FAILURE: {
      return Object.assign({}, state, {
        foldersReceived: false,
        statusMessage: 'Folder not received',
      });
    }
    default: {
      return state;
    }
  }
};
