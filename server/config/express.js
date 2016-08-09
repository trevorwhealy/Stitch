const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');

module.exports = (app, config) => {
  // logging for request on the console
  app.use(morgan(config.logLevel));

  // middleware for parsing
  app.use(bodyParser.json());
  app.use(passport.initialize());

  // serving static files to client
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
    app.use(webpackHotMiddleware(compiler));
  }
};
