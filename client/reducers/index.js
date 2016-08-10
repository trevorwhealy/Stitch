import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer.jsx';

const appReducer = combineReducers({
  users: AuthReducer,
});

export default appReducer;
