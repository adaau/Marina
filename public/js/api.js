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

};

var API = new API_WRAPPER();
