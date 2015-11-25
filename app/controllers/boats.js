var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var passport        = require('passport');

module.exports = function (app) {
  app.use('/', router);
};

function authenticatedUser(req, res, next) {
  // If the user is authenticated, then we continue the execution
  // Otherwise the request is redirected to the login page
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect('/login');
  }
}

router.route('/boats')
  .get(function(req, res, next) {
    res.render('boats/index');
  })

router.get('/boats/new', authenticatedUser, function(req, res, next) {
  res.render('boats/new');
});

router.get('/boats/:id', function(req, res, next) {
  var boatId = req.params.id;
  res.render('boats/show', { boatId });
});


