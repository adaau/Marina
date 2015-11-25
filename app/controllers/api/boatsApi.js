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

// get all the boats (accessed at GET http://localhost:3000/api/boats)
router.route('/api/boats')
  .get(function (req, res, next) {
    Boat.find(function(err, boats) {
      if (err) {
        res.send(err);
      }
      else {
        res.status(200).json(boats)
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
        User.findByIdAndUpdate(req.user._id, {$addToSet:{boat_id: boat._id}}, function(err, user) {
          if (err) {
            res.send(err);
          }
          else {
            // res.json({message: "Boat created; boat saved in user"});
            res.status(200).json(boat);
          }
        });
      }
    })
  });

// get one of the boats (accessed at GET http://localhost:3000/api/boats/:id)
router.route('/api/boats/:id')
  .get(function (req, res) {
    Boat.findById(req.params.id, function(err, boat) {
      if (err) {
        res.send(err);
      }
      else {
        res.status(200).json(boat)
      }
    });
  })

  // update the boat with this id (accessed at PUT http://localhost:3000/api/my/boats/:id)
  .put(authenticatedUser, function(req, res) {
    // Use the following commented-out method if you want to have lots of potential error situations, otherwise IGNORE
    // User.findOne( {boat_id: req.params.id}, function(err, user) {
    //   if (err) {res.send(err);}
    //   else {
    //     if (String(req.user._id) == String(user._id)) {
    Boat.findOneAndUpdate({_id: req.params.id, user_id: req.user._id}, req.body.boat, function (err, boat) {
      if (err) {
        res.send(err);
      }
      else {
        if (boat){
          res.status(200).json({message: "Boat updated!"});
        } else {
          res.status(403).json({message: "You are not authorized to change this listing."});
        }
      }
    })
  })

  // delete the boat with this id (accessed at DELETE http://localhost:3000/api/my/boats/:id)
  .delete(authenticatedUser, function(req, res) {
    console.log("delete")
    Boat.findOneAndRemove({_id: req.params.id, user_id: req.user._id}, function (err, boat) {
      console.log(boat);
      if (err) {
        res.send(err);
      }
      else {
        if (boat){
          res.status(200).json({message: "Boat removed!"});
        } else {
          res.status(403).json({message: "You are not authorized to remove this listing."});
        }
      }
    })
  });

router.route('/api/my/boats')
// INDEX get all of my boats (accessed at GET http://localhost:3000/api/my/boats)
  .get(authenticatedUser, function (req, res, next) {
    Boat.find({user_id: req.user}, function(err, boats) {
      if (err) {
        res.send(err);
      }
      else {
        res.status(200).json(boats)
      }
    });
  })


router.route('/api/my/boats/:id')
  // SHOW (accessed at GET http://localhost:3000/api/my/boats/:id)
  .get(authenticatedUser, function(req, res) {
    Boat.findOne( {_id: req.params.id, user_id: req.user._id}, function(err, boat) {
      if (err) {
        res.send(err);
      }
      else {
        if (boat) {
          res.status(200).json(boat);
        }
        else {
          res.status(403).json({message: "You are not authorized to view this boat."});
        }
      }
    });
  })

