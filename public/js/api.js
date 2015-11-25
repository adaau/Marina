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

};

var API = new API_WRAPPER();
