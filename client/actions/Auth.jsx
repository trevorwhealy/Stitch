import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken.jsx';

const SET_CURRENT_USER = 'SET_CURRENT_USER';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

// export function logout() {
//   return dispatch => {
//     localStorage.removeItem('jwtToken');
//     setAuthorizationToken(false);
//     dispatch(setCurrentUser({}));
//   }
// }

export function login(data) {
  return (dispatch) => {
    console.log('hello');
    return axios.post('/auth/login', data).then(res => {
      console.log('the res',res);
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
    })
    .error(err => {
      console.log(err);
    });
  };
}
