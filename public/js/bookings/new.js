$(function() {
  $( "#datepicker" ).datepicker();

  $('#new-booking').on('submit', function (e) {
    e.preventDefault();

    var params = {
      booking: {
        date  : $('#datepicker').val(),
      }
    };

    API.createBooking(params).then(function (boat) {
      window.location.href = "/my/bookings/" + booking._id;
    }, errorHandling);
  })
})
