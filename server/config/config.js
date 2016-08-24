const path = require('path');

const env = process.env.NODE_ENV || 'development';
const rootPath = path.join(__dirname, '../../');

const config = {
  development: {
    rootPath,
    db: process.env.DATABASE_URL || 'postgres://postgres:password@localhost/fluid',
    port: process.env.PORT || 3000,
    logLevel: process.env.LOG_LEVEL || 'debug',
    apiLogLevel: process.env.API_LOG_LEVEL || 'dev',
    secret: process.env.APP_SECRET || 'trev is cool',
    googleAuth: {
      clientID: '137062206053-fpq23489tr9q4ssh45st8nbp1ms03ffe.apps.googleusercontent.com',
      clientSecret: 'KhpOLGFlcU4uanupTd1hbqyB',
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
  },
  production: {
    rootPath,
    db: process.env.DATABASE_URL || 'postgres://postgres@localhost/fluid',
    port: process.env.PORT || 80,
    logLevel: process.env.LOG_LEVEL || 'error',
    apiLogLevel: process.env.API_LOG_LEVEL || 'tiny',
    secret: process.env.APP_SECRET || 'trev is super kinda cool',
    googleAuth: {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: process.env.GOOGLE_CALLBACK_URL || '',
    },
  },
};

module.exports = config[env];
