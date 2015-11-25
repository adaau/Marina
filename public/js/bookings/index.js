$(function() {
  API.getMyBookings().then(function(bookings) {
    bookings.forEach(function(booking) {
      $("#booking-list").append(
        '<li>' +
          '<div class="row col-xs-12">' +
            '<div class="container-info">' +
              '<h5><a href="/bookings/'+ booking._id + '">' + booking.name + '</a></h5>' +
            '</div>' +
          '</div>' +
        '</li>')
    });
  }, errorHandling);
});
