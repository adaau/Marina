$(function() {
  API.getMyBookings().then(function(bookings) {
    bookings.forEach(function(booking) {
      $("#booking-list").append(
        '<li>' +
          '<div class="row col-xs-12">' +
            '<div class="container-info">' +
              '<h5><a href="/my/bookings/'+ booking._id + '">' + booking.date + '</a></h5>' +
            '</div>' +
          '</div>' +
        '</li>')
    });
  }, errorHandling);
});
