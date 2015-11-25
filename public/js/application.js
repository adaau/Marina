// put your common function and variables here
var errorHandling = function(error) {
  var n = noty({text: error.responseJSON.message, type: 'error', timeout: 3000});
  console.log(error);
};
