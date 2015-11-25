$(function(){

  var boatId = window.location.pathname.split("/")[2];
  API.getBoat(boatId).then(function (boat){
    console.log(boat);
    $('#edit-boat-name').val(boat.name);
    $('#edit-boat-type').val(boat.type);
    $('#edit-boat-capacity').val(boat.capacity);
    $('#edit-boat-make').val(boat.make);
    $('#edit-boat-length').val(boat.length);
    $('#edit-boat-year').val(boat.year);
    $('#edit-boat-photoUrl').val(boat.photoUrl);
  }, errorHandling);

  $('#edit-boat').on('submit', function (e) {
    e.preventDefault();

    var params = {
      boat: {
        name        : $('#edit-boat-name').val(),
        type        : $('#edit-boat-type').val(),
        capacity    : $('#edit-boat-capacity').val(),
        make        : $('#edit-boat-make').val(),
        length      : $('#edit-boat-length').val(),
        year        : $('#edit-boat-year').val(),
        photoUrl    : $('#edit-boat-photoUrl').val()
      }
    };

    API.editBoat(boatId, params).then(function (boat) {
      window.location.href = "/boats/" + boat._id;
    }, errorHandling)
  })
});
