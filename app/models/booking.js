var mongoose = require('mongoose');
var User     = require ('./user');
var Boat     = require ('./boat');
var Schema   = mongoose.Schema;

var bookingSchema = new Schema ({
  date        : Number,
  user_id     : [{ type: Schema.Types.ObjectId, ref: 'User'}],
  boat_id     : [{ type: Schema.Types.ObjectId, ref: 'Boat'}]
});

module.exports = mongoose.model('Booking', bookingSchema);
