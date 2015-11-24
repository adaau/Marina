var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'wdi-express'
    },
    port: 3000,
    db: 'mongodb://localhost/wdi-express-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'wdi-express'
    },
    port: 3000,
    db: 'mongodb://localhost/wdi-express-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'wdi-express'
    },
    port: (process.env.PORT || 3000),
    db: process.env.MONGOLAB_URI
  }
};

module.exports = config[env];
