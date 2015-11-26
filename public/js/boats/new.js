$(function(){
  // var submitted = false;

  $('#new-boat').on('submit', function (e) {
    e.preventDefault();

    // if (!submitted) {
      var params = {
        boat: {
          name        : $('#boat-name').val(),
          type        : $('#boat-type').val(),
          capacity    : $('#boat-capacity').val(),
          make        : $('#boat-make').val(),
          length      : $('#boat-length').val(),
          year        : $('#boat-year').val(),
          photoUrl    : $('#boat-photoUrl').val()
        }
      };

      API.createBoat(params).then(function (boat) {
        window.location.href = "/boats/" + boat._id;
      }, errorHandling
      // function (error) {
      //   submitted = false;
      // }
      );

      // submitted = true;
    // }
  })

});