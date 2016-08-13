const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
<<<<<<< HEAD
const webpack = require('webpack');
const webpackConfig = require('../../webpack.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
=======
const passport = require('passport');
>>>>>>> c4e71ec1dab24ef4f6f132387928d89e3fa8da9f

module.exports = (app, config) => {
  // logging for request on the console
  app.use(morgan(config.apiLogLevel));

  // middleware for parsing
  app.use(bodyParser.json());
  app.use(passport.initialize());

  // serving static files to client
<<<<<<< HEAD
  const path = '/public';
  app.use(express.static(config.rootPath + path));

  // Use webpack HMR in dev
  if (process.env.NODE_ENV !== 'production') {
    // webpack
    const compiler = webpack(webpackConfig);

    app.use(webpackDevMiddleware(compiler,
     { noInfo: true, publicPath: webpackConfig.output.publicPath }));
=======
  app.use(express.static(`${config.rootPath}/public`));

  // Use webpack HMR in dev
  if (process.env.NODE_ENV !== 'production') {
    /* eslint-disable global-require */
    const webpackConfig = require('../../webpack.config');
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const compiler = webpack(webpackConfig);

    app.use(webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
    }));
>>>>>>> c4e71ec1dab24ef4f6f132387928d89e3fa8da9f
    app.use(webpackHotMiddleware(compiler));
  }
};
