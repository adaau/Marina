var mongoose = require('mongoose');
var User     = require ('./user');
var Booking  = require ('./booking');
var Schema   = mongoose.Schema;

var boatSchema = new Schema ({
  name        : { type: String, required: true },
  type        : { type: String},
  capacity    : { type: Number},
  address     : { type: String},
  longitude   : Number,
  latitude    : Number,
  make        : String,
  length      : Number,
  year        : { type: Number, min: 1980, max: 2016 },
  photoUrl    : { type: String},
  user_id     : [{ type: Schema.Types.ObjectId, ref: 'User'}],
  booking_id  : [{ type: Schema.Types.ObjectId, ref: 'Booking'}]
});

boatSchema.methods.showPhoto = function() {
  return '/img/' + this.photoUrl;
};

module.exports = mongoose.model('Boat', boatSchema);
