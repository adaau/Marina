$(function() {
  var bookingId = window.location.pathname.split("/")[3];

  API.getMyBooking(bookingId).then(function(booking) {
    $("#show-booking").append(
      '<h1>' + booking.date + '</h1>' +
      '<ul>' +
        '<li> Boat: '     + booking.boat_id + '</li>' +
        '<li> Requester: '+ booking.user_id + '</li>' +
      '</ul>'
    );
    // $("#btn-edit-booking").on('submit', function (e) {
    //   e.preventDefault();
    //   window.location.href = "/bookings/" + booking._id + "/edit";

    // })
    // $("#btn-delete-booking").on('submit', function (e) {
    //   e.preventDefault();
    //   window.location.href = "/bookings/" + booking._id + "/delete";
    // })
  }, errorHandling);
});
