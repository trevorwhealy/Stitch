import React from 'react';
import { Route, Router, browserHistory } from 'react-router';
import App from '../containers/App.jsx';
import Login from '../containers/Login.jsx';
import SignUp from '../containers/SignUp.jsx';
import Home from '../components/Home.jsx';
import Compiler from '../components/Compiler.jsx';
import Note from '../components/Note.jsx';

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
    <Route path="/" component={App} onEnter={requireAuth}>
      <Route path="home" component={Home} />
      <Route path="note" component={Note} />
      <Route path="compiler" component={Compiler} />
    </Route>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={SignUp} />
  </Router>
);
