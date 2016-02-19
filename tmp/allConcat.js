$(document).ready(function() {
  $("form#gitcoder").submit(function(event) {
    event.preventDefault();
    coder = $("input#coder").val();
    $.get('https://api.github.com/users/'+coder+'/repos', function(data) {
      console.log(data);
    });
  });
});

$(document).ready(function(){
  $('#time').text(moment());
});
