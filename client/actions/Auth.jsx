import { browserHistory } from 'react-router';

export function authInit() {
  return {
    type: 'AUTH_INITIALIZE',
  };
}

export function authSuccess(user) {
  return {
    type: 'AUTH_SUCCESS',
    user,
  };
}

export function authFailure(message) {
  return {
    type: 'AUTH_FAILURE',
    message,
  };
}

export function login(userCredentials) {
  return (dispatch) => {
    dispatch(authInit());
    return fetch('/auth/login', {
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
      const user = data.user;
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      browserHistory.push('/');
      dispatch(authSuccess(user));
    })
    .catch(err => {
      dispatch(authFailure(err));
    });
  };
}

export function signUp(userCredentials) {
  return (dispatch) => {
    dispatch(authInit());
    return fetch('/auth/signup', {
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
      const user = data.user;
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      browserHistory.push('/');
      dispatch(authSuccess(user));
    })
    .catch(err => {
      dispatch(authFailure(err));
    });
  };
}

export function currentUser() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (dispatch) => {
    dispatch(authSuccess(user));
  };
}
