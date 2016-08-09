import React from 'react';
import { Route, Router, browserHistory } from 'react-router';
import App from '../containers/App.jsx';
import Login from '../containers/Login.jsx';
// import SignUp from '../components/SignUp.jsx';

// import Home from '../containers/Home.jsx';
// import { requireAuth } from '../components/AuthComponent';

module.exports = (
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="login" component={Login} />
  </Router>
);
// <Route path="signup" component={SignUp} />
// <Route path="home" component={requireAuth(Home)} />
