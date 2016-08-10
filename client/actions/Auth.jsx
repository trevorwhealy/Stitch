import setAuthToken from '../utils/setAuthToken.jsx';

export function signInInit() {
  return {
    type: 'SIGNIN_INITIALIZE',
  };
}

export function signInSuccess(token) {
  return {
    type: 'SIGNIN_SUCCESS',
    token,
  };
}

export function signInFailure(message) {
  return {
    type: 'SIGNIN_FAILURE',
    message,
  };
}

export function login(userCredentials) {
  return (dispatch) => {
    dispatch(signInInit());
    return fetch('auth/login', {
      method: 'POST',
      body: JSON.stringify(userCredentials),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then(data => {
      if (data.statusMessage) {
        dispatch(signInFailure(data.statusMessage));
      } else if (data.token) {
        const token = data.token;
        localStorage.setItem('jwtToken', token);
        dispatch(signInSuccess(token));
      }
    })
    .catch(err => {
      console.log(err);
    });
  };
}
