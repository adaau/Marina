var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'marina'
    },
    port: 3000,
    db: 'mongodb://localhost/marina-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'marina'
    },
    port: 3000,
    db: 'mongodb://localhost/marina-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'marina'
    },
    port: (process.env.PORT || 3000),
    db: process.env.MONGOLAB_URI
  }
};

module.exports = config[env];
