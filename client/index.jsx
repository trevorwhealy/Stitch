import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import jwtDecode from 'jwt-decode';

import routes from './routes/routes.jsx';
import appReducer from './reducers/index.js';
import { setCurrentUser } from './actions/Auth.jsx';
import setAuthToken from './utils/setAuthToken.jsx';


const middleware = [thunk, promiseMiddleware, logger()];
let store = createStore(appReducer, applyMiddleware(...middleware));

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('app')
);
