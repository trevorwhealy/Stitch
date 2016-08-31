const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const compression = require('compression');
const enforce = require('express-sslify');

module.exports = (app, config) => {
  app.use(morgan(config.apiLogLevel));
  app.use(bodyParser.json());
  app.use(passport.initialize());
  app.use(compression());

  // Enforce HTTPS in production
  if (process.env.NODE_ENV === 'production') {
    app.use(enforce.HTTPS());
  }

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
