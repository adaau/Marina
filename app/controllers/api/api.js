var express  = require ('express');
var router   = express.Router();
var mongoose = require ('mongoose');
var Boat     = require ('../../models/boat');
var Booking  = require ('../../models/booking');

module.exports = function (app) {
  app.use('/', router);
};

function authenticatedUser(req, res, next) {
  // If the user is authenticated, then we continue the execution
  // Otherwise the request is always redirected to the home page
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.json({message: "Please Login"});
  }
}

router.get('/secret', authenticatedUser, function (req, res, next) {
  res.json({message: "secret"});
});

// get all the boats (accessed at GET http://localhost:3000/api/boats)
router.route('/api/boats')
  .get(function (req, res, next) {
    Boat.find(function(err, boats) {
      if (err) {
        res.send(err);
      }
      else {
        res.json(boats)
      }
    });
  })

// create a boat (accessed at POST http://localhost:3000/api/my/boats)
  .post(authenticatedUser, function (req, res, next) {
    var params = req.body.boat;
    params.user_id = req.user._id;
    Boat.create(params, function(err, boat) {
      if (err) {
        res.send(err);
      }
      else {
        res.json(boat);
      }
    })
  });

// get one of the boats (accessed at GET http://localhost:3000/api/boats/:id)
router.route('/api/boats/:id')
  .get(function (req, res) {
    Boat.findById((req.params.id), function(err, boat) {
      if (err) {
        res.send(err);
      }
      else {
        res.json(boat)
      }
    });
  })

  // update the boat with this id (accessed at PUT http://localhost:3000/api/my/boats/:id)
  .put(authenticatedUser, function(req, res) {
      // check that user_id of boat is current user
      // var params = req.body.boat;
      // if (req.body.boat.user_id !== req.user) {
      //   res.send(err);
      // }
      // else {
        console.log(req.body.boat);

        Boat.findByIdAndUpdate(req.params.id, req.body.boat, function (err, boat){
          if (err) {
            res.send(err);
          }
          else {
            res.json({message: "Boat updated!"});
          }
        });
      // }
    })

  // delete the boat with this id (accessed at DELETE http://localhost:3000/api/my/boats/:id)
  .delete(function(req, res) {
    Boat.findByIdAndRemove(req.params.id, function(err, boat) {
      if (err) {
        res.send(err);
      }
      else {
        res.json({ message: "Boat has been deleted" });
      }
    });
  });

router.route('/api/my/boats')
// INDEX get all of my boats (accessed at GET http://localhost:3000/api/my/boats)
  .get(authenticatedUser, function (req, res, next) {
    Boat.find({user_id: req.user}, function(err, boats) {
      if (err) {
        res.send(err);
      }
      else {
        res.json(boats)
      }
    });
  })


router.route('/api/my/boats/:id')
  // SHOW (accessed at GET http://localhost:3000/api/my/boats/:id)
  .get(authenticatedUser, function(req, res) {
    Boat.findById(req.params.id, function(err, boat) {
      if (err) {
        res.send(err);
      }
      else {
        res.json(boat);
      }
    });
  });

router.route('/api/my/bookings')
  .get(authenticatedUser, function(req, res) {
    Booking.find({user_id: req.user}, function(err, booking) {
      if (err) {
        res.send(err);
      }
      else {
        res.json(bookings)
      }
    });
  })

  .post(authenticatedUser, function(req, res) {
    var params = req.body.booking;
    params.user_id = req.user._id;
    Booking.create(params, function(err, booking) {
      if (err) {
        res.send(err);
      }
      else {
        res.json(booking);
      }
    })
  });

router.route('/api/my/bookings/:id')
  .get(authenticatedUser, function(req, res) {
    Booking.find(req.params.id, function(err, boat) {
      if (err) {
        res.send(err);
      }
      else if (booking.user_id != req.user) {
        res.send(err);
      }
      else {
        res.json(booking);
      }
    });
  })

  .put(authenticatedUser, function(req, res) {
    Booking.findByIdAndUpdate(req.params.id, req.body.booking, function(err, boat) {
      if (err) {
        res.send(err);
      }
      else if (booking.user_id != req.user) {
        res.send(err);
      }
      else {
        res.json({message: "Booking has been updated!"});
      }
    });
  })

  .delete(authenticatedUser, function(req, res) {
    Booking.findByIdAndRemove(req.params.id, function(err, booking) {
      if (err) {
        res.send(err);
      }
      else if (booking.user_id != req.user) {
        res.send(err);
      }
      else {
        res.json({message: "Booking has been deleted!"});
      }
    })
  });