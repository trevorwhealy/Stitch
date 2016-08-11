import { browserHistory } from 'react-router';

export function authInit() {
  return {
    type: 'AUTH_INITIALIZE',
  };
}

export function authSuccess(token) {
  // change the route right here
  return {
    type: 'AUTH_SUCCESS',
    token,
  };
}

export function authFailure(message) {
  return {
    type: 'AUTH_FAILURE',
    message,
  };
}

export function logout() {
  localStorage.removeItem('jwtToken');
  return {
    type: 'LOGOUT_USER',
  };
}

export function login(userCredentials) {
  return (dispatch) => {
    dispatch(authInit());
    return fetch('auth/login', {
      method: 'POST',
      body: JSON.stringify(userCredentials),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then(data => {
      if (!data.token) { throw new Error('no token'); }
      const token = data.token;
      localStorage.setItem('jwtToken', token);
      browserHistory.push('/home');
      dispatch(authSuccess(token));
    })
    .catch(err => {
      dispatch(authFailure(err));
    });
  };
}

export function signUp(userCredentials) {
  return (dispatch) => {
    dispatch(authInit());
    return fetch('auth/signup', {
      method: 'POST',
      body: JSON.stringify(userCredentials),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then(data => {
      if (!data.token) { throw new Error('no token'); }
      const token = data.token;
      localStorage.setItem('jwtToken', token);
      browserHistory.push('/home');
      dispatch(authSuccess(token));
    })
    .catch(err => {
      dispatch(authFailure(err));
    });
  };
}
