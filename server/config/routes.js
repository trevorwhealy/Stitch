const passport = require('passport');

const AuthRouter = require('../auth/auth.routes');
const FolderRouter = require('../folders/folder.routes');

module.exports = (app, config) => {
  app.use('/auth', AuthRouter);

  app.use('/api', passport.authenticate('jwt', { session: false }));
  app.use('/api/folders', FolderRouter);

  app.get('/*', (req, res) => {
    res.sendFile(`${config.rootPath}/public/index.html`);
  });
};
