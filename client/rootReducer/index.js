import { combineReducers } from 'redux';
import AuthReducer from '../auth/reducers/AuthReducer.jsx';
import FolderReducer from '../folders/reducers/FolderReducer.jsx';
import NotesReducer from '../notes/reducers/NotesReducer.jsx';
import SingleNoteReducer from '../notes/reducers/SingleNoteReducer.jsx';
import NotesInFolderReducer from '../folders/reducers/NotesInFolderReducer.jsx';
import NotificationReducer from '../notifications/reducers/NotificationReducer.jsx';
import SingleFolderReducer from '../folders/reducers/SingleFolderReducer.jsx';
import SearchReducer from '../shared/reducers/SearchReducer.jsx';
import CommentReducer from '../comments/reducers/CommentReducer.jsx';

const appReducer = combineReducers({
  user: AuthReducer,
  folders: FolderReducer,
  notes: NotesReducer,
  singleNote: SingleNoteReducer,
  notesInFolder: NotesInFolderReducer,
  notifications: NotificationReducer,
  singleFolder: SingleFolderReducer,
  globalSearch: SearchReducer,
  comments: CommentReducer,
});

export default appReducer;
