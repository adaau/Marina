var test;
$(function() {
  var dateCell;

  $( "#datepicker" ).datepicker();

  $('#edit-submit').on('click', function (e) {
    e.preventDefault();
    var bookingId = $('#edit-date-form').data('bookingid');
    var date      = $( "#datepicker" ).datepicker("getDate");

    var params = {
      booking: {
        date: date
      }
    }

    API.editMyBooking(bookingId, params).then(function (booking) {
      var unformattedDate = new Date(date);
      var formattedDate = unformattedDate.toDateString();
      dateCell.html(formattedDate);

      $('#edit-date-modal').modal("hide");
      noty({text: "Booking Changed", type: "success", timeout: 3000});
    }, errorHandling);
  })

  API.getMyBookings().then(function(bookings) {
    bookings.forEach(function(booking) {
      var unformattedDate = new Date(booking.date);
      var formattedDate = unformattedDate.toDateString();
      $("#booking-list").append(
        '<tr>' +
          '<td>' + '<a href="/my/bookings/'+ booking._id + '">' + booking.boat_id.name + '</a></td>' +
          '<td class="date-cell">' + formattedDate + '</td>' +
          '<td><button data-bookingid="' + booking._id + '" class="edit-date btn btn-info">Edit</button></td>' +
          '<td><button data-bookingid="' + booking._id + '"class="btn delete-btn btn-danger">Delete</button></td>' +
        '</tr>')
    });

    $(".edit-date").on('click', function (e) {
      e.preventDefault();
      dateCell = $(this).parent().parent().find(".date-cell")

      var bookingId = $(this).data('bookingid');

      $('#edit-date-form').data('bookingid', bookingId)

      $('#edit-date-modal').modal('show');
    })

    $(".delete-btn").on('click', function (e) {
      e.preventDefault();
      var trElem = $(this).parent().parent();
      var bookingId =  $(this).data('bookingid')

      API.deleteBooking(bookingId).then(function(data) {
        trElem.remove();
      }, errorHandling);
    })

  }, errorHandling);
});
