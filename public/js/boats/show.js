$(function() {
  var boatId = window.location.pathname.split("/")[2];

  API.getBoat(boatId).then(function(boat) {
    $("#show-boat").append(
      '<h1>' + boat.name + '</h1>' +
      // '<div class="container-img">' +
      //   '<img src="'boat.showPhoto()'">' +
      // '</div>' +
      '<ul>' +
        '<li> Type: '     + boat.type + '</li>' +
        '<li> Make: '     + boat.make + '</li>' +
        '<li> Length: '   + boat.length + '</li>' +
        '<li> Capacity: ' + boat.capacity + '</li>' +
        '<li> Year: '     + boat.year + '</li>' +
        '<li> Price: '    + boat.price + '</li>' +
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
      }, errorHandling);
    })
  }, errorHandling);
});
