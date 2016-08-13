import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer.jsx';
import FolderReducer from './FolderReducer.jsx';
import NoteReducer from './NoteReducer.jsx';

const appReducer = combineReducers({
  users: AuthReducer,
  folders: FolderReducer,
  notes: NoteReducer,
});

export default appReducer;
