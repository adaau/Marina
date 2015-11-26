$(function() {
  API.getMyBookings().then(function(bookings) {
    bookings.forEach(function(booking) {
      var unformattedDate = new Date(booking.date);
      var formattedDate = unformattedDate.toDateString();
      $("#booking-list").append(
        '<li>' +
          '<div class="row col-xs-12">' +
            '<div class="container-info">' +
              '<h5><a href="/my/bookings/'+ booking._id + '">' + formattedDate + '</a></h5>' +
            '</div>' +
          '</div>' +
        '</li>')
    });
  }, errorHandling);
});
