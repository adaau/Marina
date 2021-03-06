$(function() {
  $("#datepicker-edit").datepicker();

  var bookingId = window.location.pathname.split("/")[3];

  API.getMyBooking(bookingId).then(function(booking) {
  var unformattedDate = new Date(booking.date);
  var formattedDate = unformattedDate.toDateString();
    $("#show-booking").append(
      '<h1>' + formattedDate + '</h1>' +
      '<ul>' +
        '<li> Boat: '     + booking.boat_id.name + '</li>' +
        '<li> Requester: '+ booking.user_id.name + '</li>' +
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

    $("#btn-delete-booking").on('click', function (e) {
      e.preventDefault();
      API.deleteBooking(booking._id).then(function(data) {
        window.location.href = "/my/bookings";
        noty({
          text: "Booking Deleted",
          type: "success",
          timeout: 3000
        });
      }, errorHandling);
    })
  }, errorHandling);
});
