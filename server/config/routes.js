const passport = require('passport');
const AuthRouter = require('../auth/auth.routes');
const FolderRouter = require('../folders/folder.routes');
const NoteRouter = require('../notes/note.routes');
const CommentRouter = require('../comments/comment.routes');

module.exports = (app, config) => {
  app.use('/auth', AuthRouter);

  app.use('/api', passport.authenticate('jwt', { session: false }));
  app.use('/api/folders', FolderRouter);
  app.use('/api/notes', NoteRouter);
  app.use('/api/comments', CommentRouter);

  app.get('/*', (req, res) => {
    res.sendFile(`${config.rootPath}/public/index.html`);
  });
};
