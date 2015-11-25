var API_WRAPPER = function() {
  this.URL_BASE = window.location.origin;

  this.getSecret = function () {
    return $.ajax({
      url:    this.URL_BASE + "/secret",
      method: "GET"
    });
  };

  this.getBoats = function () {
    return $.ajax({
      url:    this.URL_BASE + "/api/boats",
      method: "GET"
    });
  };

  this.getBoat = function (boatId) {
    return $.ajax({
      url:    this.URL_BASE + "/api/boats/" + boatId,
      method: "GET"
    });
  };

  this.createBoat = function(params) {
    return $.ajax({
      url:    this.URL_BASE + "/api/boats",
      method: "POST",
      data: params
    });
  };

  this.editBoat = function(boatId, params) {
    return $.ajax({
      url:    this.URL_BASE + "/api/boats/" + boatId,
      method: "PUT",
      data:   params
    });
  };

  this.deleteBoat = function(boatId) {
    return $.ajax({
      url:    this.URL_BASE + "/api/boats/" + boatId,
      method: "DELETE"
    });
  };

  this.getMyBookings = function() {
    return $.ajax({
      url:    this.URL_BASE + "/api/my/bookings",
      method: "GET"
    });
  };
};

var API = new API_WRAPPER();
