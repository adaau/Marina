var express  = require ('express');
var router   = express.Router();
var mongoose = require ('mongoose');
var Boat     = require ('../../models/boat');

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
router.get('/api/boats', function (req, res, next) {
  Boat.find(function(err, boats) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(boats)
    }
  });
});

// get one of the boats (accessed at GET http://localhost:3000/api/boats/:id)
router.get('/api/boats/:id', function (req, res) {
  Boat.findById((req.params.id), function(err, boat) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(boat)
    }
  });
});

router.route('api/my/boats')
// INDEX get all of my boats (accessed at GET http://localhost:3000/api/my/boats)
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
  .post(function (req, res, next) {
    console.log(req.user);
    // var params = req.body.boat;
    // params.user_id = req.user;
    // Boat.create(params, function(err, boat) {
    //   if (err) {
    //     res.send(err);
    //   }
    //   else {
    //   res.json(boat);
    //   }
    // })
  });

router.route('/api/my/boats/:id')
  // SHOW (accessed at GET http://localhost:3000/api/my/boats/:id)
  .get(function(req, res) {
    Boat.findById((req.params.id), function(err, boat) {
      if (err)
        res.send(err);

      res.json(boat);
    });
  })

  // update the boat with this id (accessed at PUT http://localhost:3000/api/my/boats/:id)
  .put(function(req, res) {
    // use our boat model to find the boat we want
    Boat.findById(req.params.id, function(err, boat) {
      if (err) {
        res.send(err);
      }

      // check that user_id of boat is current user
      //

      boat.params = req.body.params;  // update the boat's info

      // save the boat
      boat.save(function(err) {
        if (err) {
          res.send(err);
        }
        else {
          res.json({ message: 'Boat updated!' });
        }
    });
    })
  })

  // delete the boat with this id (accessed at DELETE http://localhost:3000/api/my/boats/:id)
    .delete(function(req, res) {
      Boat.remove({
        _id: req.params.boat_id
      }, function(err, boat) {
        if (err)
          res.send(err);

        res.json({ message: 'Successfully deleted' });
      });
    });
