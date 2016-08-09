const AuthRouter = require('../auth/auth.routes');

module.exports = (app, config) => {
  app.use('/auth', AuthRouter);

  app.get('/*', (req, res) => {
    res.sendFile(`${config.rootPath}/public/index.html`);
  });
};
