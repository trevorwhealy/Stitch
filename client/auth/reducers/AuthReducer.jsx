
const initialState = {
  fullName: '',
  email: '',
  photo: '',
  id: '',
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
        fullName: action.user.fullName,
        email: action.user.email,
        photo: action.user.photo,
        id: action.user.id,
        isAuthenticating: false,
        isAuthenticated: true,
        statusMessage: 'You have been successfully logged in.',
      });
    case AUTH_FAILURE:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: false,
        fullName: '',
        email: '',
        statusMessage: action.message,
      });
    case LOGOUT_USER:
      return Object.assign({}, state, {
        isAuthenticated: false,
        token: null,
        username: null,
        statusMessage: 'Successfully logged out',
      });
    default: {
      return state;
    }
  }
};
