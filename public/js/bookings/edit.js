$(function() {

  var bookingId = window.location.pathname.split("/")[3];
  API.getMyBooking(bookingId).then(function (booking) {
    console.log(booking);
    $('#edit-booking-date').val(booking.date);
  }, errorHandling);

  $('#edit-booking').on('submit', function (e) {
    e.preventDefault();

    var params = {
      booking: {
        date: $('#edit-booking-date')
      }
    };

    API.editMyBooking(boatId, params).then(function (booking) {
      window.location.href = "/my/bookings/" + booking._id;
    }, errorHandling)
  })
});


