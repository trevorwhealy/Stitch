import jwtDecode from 'jwt-decode';

const initialState = {
  token: null,
  username: '',
  isAuthenticated: false,
  isAuthenticating: false,
  statusMessage: '',
};

const AUTH_INITIALIZE = 'AUTH_INITIALIZE';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const AUTH_FAILURE = 'AUTH_FAILURE';
const LOGOUT_USER = 'LOGOUT_USER';

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_INITIALIZE:
      return Object.assign({}, state, {
        isAuthenticating: true,
        statusMessage: 'authenticating',
      });
    case AUTH_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: true,
        token: action.token,
        username: jwtDecode(action.token).username,
        statusMessage: 'You have been successfully logged in.',
      });
    case AUTH_FAILURE:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: false,
        token: null,
        username: null,
        statusMessage: action.message,
      });
    case LOGOUT_USER:
      return Object.assign({}, state, {
        isAuthenticated: false,
        token: null,
        username: null,
        statusMessage: 'Successfully logged out',
      });
    default: return state;
  }
};
