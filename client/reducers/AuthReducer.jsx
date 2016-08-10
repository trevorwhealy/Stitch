import jwtDecode from 'jwt-decode';

const initialState = {
  token: null,
  username: '',
  isAuthenticated: false,
  isAuthenticating: false,
  statusMessage: '',
};

const SIGNIN_INITIALIZE = 'SIGNIN_INITIALIZE';
const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
const SIGNIN_FAILURE = 'SIGNIN_FAILURE';
const LOGOUT_USER = 'LOGOUT_USER';

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_INITIALIZE:
      return Object.assign({}, state, {
        isAuthenticating: true,
        statusMessage: 'authenticating',
      });
    case SIGNIN_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: true,
        token: action.token,
        userName: jwtDecode(action.token).userName,
        statusMessage: 'You have been successfully logged in.',
      });
    case SIGNIN_FAILURE:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: false,
        token: null,
        userName: null,
        statusMessage: action.message,
      });
    case LOGOUT_USER:
      return Object.assign({}, state, {
        isAuthenticated: false,
        token: null,
        userName: null,
        statusMessage: action.message,
      });
    default: return state;
  }
};
