/* Libraries Imports */
import 'materialize-css/sass/materialize.scss';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import routes from './routes/routes.jsx';
import appReducer from './reducers/index.js';

import './app.scss';

const middleware = [thunk, promiseMiddleware, logger()];
let store = createStore(appReducer, applyMiddleware(...middleware));

ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('app')
);
