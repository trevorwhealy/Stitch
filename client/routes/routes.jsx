import React from 'react';
import { Route, Router, browserHistory } from 'react-router';
import App from '../containers/App.jsx';
import Login from '../containers/Login.jsx';
import SignUp from '../containers/SignUp.jsx';

module.exports = (
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="login" component={Login} />
    <Route path="signup" component={SignUp} />
  </Router>
);
