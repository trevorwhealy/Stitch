import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
import { login } from '../actions/Auth.jsx';
import LoginForm from '../components/LoginForm.jsx';

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (userCredentials) => {
      dispatch(login(userCredentials));
    },
  };
};

const Login = connect(
  mapDispatchToProps
)(LoginForm);

export default Login;






























// import React from 'react';
// import LoginForm from '../components/LoginForm.jsx';
// import { login } from '../actions/Auth.jsx';

// export default class Login extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: '',
//       password: '',
//     };

//     this.onSubmit = this.onSubmit.bind(this);
//     this.onUserNameChange = this.onUserNameChange.bind(this);
//     this.onPasswordChange = this.onPasswordChange.bind(this);
//   }

//   onSubmit(e) {
//     e.preventDefault();
//     const userObj = { username: this.state.username, password: this.state.password };
//     login(userObj)(this.props.dispatch);
//   }

//   onUserNameChange(event) {
//     this.setState({
//       username: event.target.value,
//     });
//   }

//   onPasswordChange(event) {
//     this.setState({
//       password: event.target.value,
//     });
//   }
  
//   render() {
//     return (
//       <div>
//         <LoginForm
//           onUserNameChange={this.onUserNameChange}
//           onPasswordChange={this.onPasswordChange}
//           onSubmit={this.onSubmit}
//         />
//       </div>
//     );
  

// }
