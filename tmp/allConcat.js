$(document).ready(function(){
  $('#gituser').click(function(){
    var coder = $("input#coder").val();
    $('input#coder').val("");
    $('.result').text("Here is your git user" + coder);
    $.get('https://api.github.com/users/'+coder+'/repos', function(response) {
      if (response.cod !== 200) {
        $('.result').text(response);
      } else {
        $('.result').text("WTF");
      }
    });
  });
});


$(document).ready(function(){
  $('#time').text(moment());
});
