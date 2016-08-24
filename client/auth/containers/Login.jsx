import { connect } from 'react-redux';
import { login } from '../actions/Auth.jsx';
import LoginForm from '../components/LoginForm.jsx';

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (userCredentials) => {
      dispatch(login(userCredentials));
    },
  };
};

const Login = connect(
  null,
  mapDispatchToProps
)(LoginForm);

export default Login;
