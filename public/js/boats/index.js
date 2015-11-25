$(function() {
  API.getBoats().then(function(boats) {
    boats.forEach(function(boat) {
      $("#boat-list").append(
        '<li>' +
        '<h5><a href="/boats/'+ boat._id + '">' + boat.name + '</a></h5>' +
        '<h6>Capacity: ' + boat.capacity + '</h6>' +
        '</li>')
    });
  }, errorHandling);
});
