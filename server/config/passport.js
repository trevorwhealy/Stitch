const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const config = require('./config');
const User = require('../users/user.model');

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: config.secret,
}, (jwtPayload, done) => {
  const email = jwtPayload.email || null;
  const googleId = jwtPayload.googleId || null;
  User.findOne({ where: { email, googleId } })
    .then(user => done(null, user))
    .catch(done);
}));

passport.use(new GoogleStrategy(config.googleAuth, (accessToken, refreshToken, profile, done) => {
  User.findOrCreate({
    where: { googleId: profile.id },
    defaults: {
      fullName: profile.displayName,
      photo: profile.photos[0] ? profile.photos[0].value : undefined,
      email: profile.emails[0] ? profile.emails[0].value : undefined,
    },
  })
  .then(users => done(null, users[0]))
  .catch(done);
}));
