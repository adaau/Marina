var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var passport        = require('passport');

module.exports = function (app) {
  app.use('/', router);
};


router.get('/boats', function(req, res, next) {
  res.render('boats/index');
})

router.get('/boats/:id', function(req, res, next) {
  var boatId = req.params.id;
  res.render('boats/show', { boatId });
})

