
export function authInit() {
  return {
    type: 'AUTH_INITIALIZE',
  };
}

export function authSuccess(token) {
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
  localStorage.removeItem('token');
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
      if (data.message) {
        dispatch(authFailure(data.message));
      } else if (data.token) {
        const token = data.token;
        localStorage.setItem('jwtToken', token);
        dispatch(authSuccess(token));
      }
    })
    .catch(err => {
      console.log(err);
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
      if (data.message) {
        dispatch(authFailure(data.message));
      } else if (data.token) {
        const token = data.token;
        console.log('tokenizing fam')
        localStorage.setItem('jwtToken', token);
        dispatch(authSuccess(token));
      }
    })
    .catch(err => {
      console.log(err);
    });
  };
}
