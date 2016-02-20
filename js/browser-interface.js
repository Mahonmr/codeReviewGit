$(document).ready(function(){
  $('#gituser').click(function(event){
    event.preventDefault();
    $('.container2').html('<div id="loader"><img src="css/loader.gif" alt="loading..."></div>');

    var coder = $("input#coder").val();
    var gitCoder   = 'https://api.github.com/users/'+coder;
    var gitCoderRepo  = 'https://api.github.com/users/'+coder+'/repos';

    $('input#coder').val("");
console.log(coder);
    $.get('https://api.github.com/users/'+coder, function(response) {
      if (response.status !== 200) {
        $('.container2').text("aldfjadlkj");
      } else {
        $('.container2').text("The humidity");
      }
    });
  });
});

