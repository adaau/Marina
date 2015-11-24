var mongoose = require('mongoose');

var boatSchema = new mongoose.Schema ({
  name        : { type: String, required: true },
  type        : { type: String, required: true },
  capacity    : { type: Number, min: 1, required: true },
  make        : String,
  length      : Number,
  year        : { type: Number, min: 1980, max: 2016 },
  photoUrl    : { type: String, required: true }
});

boatSchema.methods.showPhoto = function() {
  return '/img/' + this.photoUrl;
};

var Boat = mongoose.model('Boat', boatSchema);

module.exports = Boat;
