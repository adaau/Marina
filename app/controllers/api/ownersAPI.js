var express  = require ('express');
var router   = express.Router();
var mongoose = require ('mongoose');
var Boat     = require ('../../models/boat');
var Booking  = require ('../../models/booking');
var User     = require ('../../models/user');

module.exports = function (app) {
  app.use('/', router);
};

function authenticatedUser(req, res, next) {
  // If the user is authenticated, then we continue the execution
  // Otherwise the request is always redirected to the home page
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).json({message: "Please Login"});
  }
}

// GET Index of all bookings (of my boats)
router.route('/api/my/boats/bookings')
  .get(authenticatedUser, function (req, res, next) {
    Boat.find({user_id: req.user}.exists('booking_id', true).exec(function(err, boats) {
      if (err) {
        res.status(400).send(err);
      }
      else {
        res.status(200).json(boats)
      }
    }));
  });

