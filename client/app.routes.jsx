import React from 'react';
import { Route, Router, browserHistory, IndexRoute } from 'react-router';
import App from './App.jsx';
import OAuthSuccess from './auth/components/OAuthSuccess.jsx';
import Login from './auth/containers/Login.jsx';
import SignUp from './auth/containers/SignUp.jsx';
import Compiler from './editor/compiler/Compiler.jsx';
import Home from './home/components/Home.jsx';
import Note from './notes/components/Note.jsx';
import NewNote from './notes/components/NewNote.jsx';
import AllNotes from './notes/components/AllNotes.jsx';
import FolderNotes from './folders/components/FolderNotes.jsx';
import AllFolders from './folders/components/AllFolders.jsx';

const requireAuth = (nextState, replace) => {
  const token = localStorage.getItem('jwtToken');
  if (!token) {
    replace({
      pathname: '/login',
    });
  }
};

const logout = (nextState, replace) => {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('user');
  replace({ pathname: '/login' });
};

module.exports = (
  <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={App} onEnter={requireAuth} >
      <IndexRoute component={Home} />
      <Route path="/folders/:id" component={FolderNotes} />
      <Route path="/notes/new" component={NewNote} />
      <Route path="/notes/:id" component={Note} />
      <Route path="/notes" component={AllNotes} />
      <Route path="/folders" component={AllFolders} />
      <Route path="/compiler" component={Compiler} />
    </Route>
    <Route path="/oauthsuccess" component={OAuthSuccess} />
    <Route path="/login" component={Login} />
    <Route path="/logout" onEnter={logout} />
    <Route path="/signup" component={SignUp} />
  </Router>
);
