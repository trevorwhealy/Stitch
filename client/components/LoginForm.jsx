import React from 'react';
import { Link } from 'react-router';

const LoginForm = ({ onSubmit }) => {
  let emailInput;
  let passwordInput;

  const login = e => {
    e.preventDefault();
    onSubmit({
      email: emailInput.value,
      password: passwordInput.value,
    });
  };

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={login}>
        <h2>Welcome Back</h2>
        <h5>Sign in to continue using Stitch</h5>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input
            id="email" type="email" className="validate" required
            ref={c => { emailInput = c; }}
          />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input
            id="password" type="password" className="validate" required
            ref={c => { passwordInput = c; }}
          />
        </div>
        <button type="submit" className="waves-effect waves-light btn">Continue</button>
        <div className="auth__alternative">Don't have an account? <Link to="/signup">Register</Link></div>
        <div className="auth__thirdParty">
          <a className="btn googleBtn" href="/auth/google">Sign In With Google</a>
        </div>
      </form>
    </div>
  );
};


export default LoginForm;
