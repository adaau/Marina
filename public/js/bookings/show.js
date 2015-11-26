$(function() {
  $("#datepicker-edit").datepicker();

  var bookingId = window.location.pathname.split("/")[3];

  API.getMyBooking(bookingId).then(function(booking) {
    $("#show-booking").append(
      '<h1>' + booking.date + '</h1>' +
      '<ul>' +
        '<li> Boat: '     + booking.boat_id + '</li>' +
        '<li> Requester: '+ booking.user_id + '</li>' +
      '</ul>'
    );

    $("#btn-booking-edit").on('click', function (e) {
      e.preventDefault();

      var params = {
        booking: {
          date: $('#datepicker-edit').val()
        }
      };

      API.editMyBooking(bookingId, params).then(function (booking) {
        window.location.href = "/my/bookings/";
        noty({text: "Booking Changed", type: "success", timeout: 3000});
      }, errorHandling);
    })

    $("btn-delete-booking").on('submit', function (e) {
      e.preventDefault();
      API.deleteBooking(booking._id).then(function(data) {
        window.location.href = "/my/bookings";
        noty({text: "Booking Deleted", type: "success", timeout: 3000});
      }, errorHandling);
    })
  }, errorHandling);
});
