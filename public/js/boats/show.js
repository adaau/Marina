$(function() {
  var boatId = window.location.pathname.split("/")[2]

  API.getBoat(boatId).then(function(boat) {
    $("#show-name").append(boat.name)
  }, errorHandling);
});
