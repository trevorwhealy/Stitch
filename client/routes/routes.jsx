import React from 'react';
import { Route, Router, browserHistory, IndexRoute } from 'react-router';
import App from '../containers/App.jsx';
import Login from '../containers/Login.jsx';
import SignUp from '../containers/SignUp.jsx';
import Home from '../components/Home.jsx';
import Compiler from '../components/blocks/Compiler.jsx';
import Note from '../components/Note.jsx';
import FolderNotes from '../components/FolderNotes.jsx';
import NewNote from '../components/NewNote.jsx';

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
      <IndexRoute component={Home} />
      <Route path="/folders/:id" component={FolderNotes} />
      <Route path="/notes/new" component={NewNote} />
      <Route path="/notes/:id" component={Note} />
      <Route path="/compiler" component={Compiler} />
    </Route>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={SignUp} />
  </Router>
);
