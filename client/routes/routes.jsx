import React from 'react';
import { Route, Router, browserHistory } from 'react-router';
import App from '../containers/App.jsx';
import Login from '../containers/Login.jsx';
import SignUp from '../containers/SignUp.jsx';
import Home from '../components/Home.jsx';
import Main from '../components/Main.jsx';
import Sidebar from '../components/Sidebar.jsx';

const requireAuth = (nextState, replace) => {
  const token = localStorage.getItem('jwtToken');
  if (!token) {
    replace({
      pathname: '/login',
    });
  }
};

module.exports = (
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <Route path="login" component={Login} />
      <Route path="signup" component={SignUp} />
      <Route path="main" component={Main} />
      <Route path="sidebar" component={Sidebar} />
      <Route path="home" component={Home} onEnter={requireAuth} />
    </Route>
  </Router>
);
