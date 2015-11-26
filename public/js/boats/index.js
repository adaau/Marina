$(function() {
  API.getBoats().then(function(boats) {
    boats.forEach(function(boat) {
      $("#boat-list").append(
        '<li>' +
          '<div class="row col-xs-12 col-sm-6 col-md-4 thumb">' +
            '<div class="container-img">' +
              '<a class="thumbnail" href="/boats/'+ boat._id + '">' +
                '<img src="/img/' + boat.photoUrl + '">' +
              '</a>' +
            '</div>' +
            '<div class="container-info">' +
              '<h5>' + boat.name + '</h5>' +
              '<p>Capacity: ' + boat.capacity + '</p>' +
              '<p>Price / Day: $' + boat.price + '</p>' +
            '</div>' +
          '</div>' +
        '</li>')
    });
  }, errorHandling);
});
