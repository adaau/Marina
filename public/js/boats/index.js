$(function() {
  API.getBoats().then(function(boats) {
    boats.forEach(function(boat) {
      $("#boat-list").append(
        '<li>' +
          '<div class="row col-xs-12 col-sm-6 col-md-4 thumb">' +
            '<div class="container-img">' +
            '</div>' +
            '<div class="container-info">' +
              '<h5><a href="/boats/'+ boat._id + '">' + boat.name + '</a></h5>' +
              '<h6>Capacity: ' + boat.capacity + '</h6>' +
            '</div>' +
          '</div>' +
        '</li>')
    });
  }, errorHandling);
});
