$(function() {
  $("#datepicker").datepicker();

  var boatId = window.location.pathname.split("/")[2];

  $('#btn-booking').data('id', boatId);

  $('#btn-booking').one('click', function (e) {
    e.preventDefault();

    var params = {
      booking: {
        boat_id: boatId,
        date: $('#datepicker').val()
      }
    }

    API.createBooking(params).then(function (data) {
      console.log(data);
      noty({text: "Booking Complete", type: "success", timeout: 3000});
    }, errorHandling);
  })

  API.getBoat(boatId).then(function(boat) {
    $("#show-boat").append(
      '<h1>' + boat.name + '</h1>' +
      '<div class="container-img">' +
        '<img src="/img/' + boat.photoUrl + '">' +
      '</div>' +
      '<ul>' +
        '<li><p> Type: '       + boat.type     +         '</p></li>' +
        '<li><p> Make: '       + boat.make     +         '</p></li>' +
        '<li><p> Length: '     + boat.length   + ' feet   </p></li>' +
        '<li><p> Capacity: '   + boat.capacity + ' people </p></li>' +
        '<li><p> Year Built: ' + boat.year     +         '</p></li>' +
        '<li><p> Price: $'     + boat.price    +         '</p></li>' +
      '</ul>'
    );
    $("#btn-edit-boat").on('submit', function (e) {
      e.preventDefault();
      window.location.href = "/boats/" + boat._id + "/edit";

    })
    $("#btn-delete-boat").on('submit', function (e) {
      e.preventDefault();
      API.deleteBoat(boat._id).then(function(data){
        window.location.href = "/boats";
        noty({text: "Boat Deleted", type: "success", timeout: 3000});

      }, errorHandling);
    })
  }, errorHandling);
});
