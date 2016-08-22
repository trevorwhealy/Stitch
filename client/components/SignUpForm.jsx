import React from 'react';
import { Link } from 'react-router';

const SignUpForm = ({ onSubmit }) => {
  let nameInput;
  let emailInput;
  let passwordInput;

  const signup = (e) => {
    e.preventDefault();
    onSubmit({
      fullName: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    });
  };

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={signup}>
        <h2>Account Registration</h2>
        <h5>Sign up to start taking notes with Stitch</h5>
        <div className="input-field">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName" type="text" className="validate" required
            ref={c => { nameInput = c; }}
          />
        </div>
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
        <div className="auth__alternative">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
        <div className="auth__thirdParty">
          <a className="btn googleBtn" href="/auth/google">Sign Up With Google</a>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
