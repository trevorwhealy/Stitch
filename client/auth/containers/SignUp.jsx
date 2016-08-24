import { connect } from 'react-redux';
import { signUp } from '../actions/Auth.jsx';
import SignUpForm from '../components/SignUpForm.jsx';

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (userCredentials) => {
      dispatch(signUp(userCredentials));
    },
  };
};

const SignUp = connect(
  null,
  mapDispatchToProps
)(SignUpForm);

export default SignUp;
