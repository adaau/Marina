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

router.get('/secret', authenticatedUser, function (req, res, next) {
  res.json({message: "secret"});
});

// POST Create booking of a boat
router.route('/api/bookings')
  .post(authenticatedUser, function(req, res) {
    var params = req.body.booking;
    params.user_id = req.user._id;
    Booking.create(params, function(err, booking) {
      if (err) {
        res.status(401).send(err);
      }
      else {
        User.findByIdAndUpdate(req.user._id, {$addToSet: {booking_id: booking._id}}, function(err, user) {
          if (err) {
            res.status(403).send(err)
          }
          else {
            res.status(200).json(booking);
          }
        });
      }
    })
  });

// GET Index of all my bookings (of others' boats)
router.route('/api/my/bookings')
  .get(authenticatedUser, function(req, res) {
    Booking.find({user_id: req.user}, function(err, bookings) {
      if (err) {
        res.status(400).send(err);
      }
      else {
        res.status(200).json(bookings)
      }
    }).populate("user_id").populate("boat_id");
  });

router.route('/api/my/bookings/:id')
  .get(authenticatedUser, function(req, res) {
    Booking.findOne( {_id: req.params.id, user_id: req.user._id}, function(err, booking) {
      if (err) {
        res.status(400).send(err);
      }
      else {
        if (booking) {
          res.status(200).json(booking);
        }
        else {
          res.status(403).json({message: "You are not authorized to view this booking."});
        }
      }
    }).populate("user_id").populate("boat_id");
  })

  .put(authenticatedUser, function(req, res) {
    Booking.findOneAndUpdate({_id: req.params.id, user_id: req.user._id}, req.body.booking, function (err, booking) {
      if (err) {
        res.status(400).send(err);
      }
      else {
        if (booking){
          res.status(200).json({message: "Booking updated!"});
        } else {
          res.status(403).json({message: "You are not authorized to change this booking."});
        }
      }
    })
  })


  .delete(authenticatedUser, function(req, res) {
    Booking.findOneAndRemove({_id: req.params.id, user_id: req.user._id}, function (err, booking) {
      if (err) {
        res.status(400).send(err);
      }
      else {
        if (booking){
          res.status(200).json({message: "Booking canceled!"});
        } else {
          res.status(403).json({message: "You are not authorized to cancel this listing."});
        }
      }
    })
  });
