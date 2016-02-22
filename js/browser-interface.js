var Git = require('./../js/git.js').Git;

$(document).ready(function(e){
  $('#ghsubmitbtn').on('click', function(e){
    e.preventDefault();
    $('#ghapidata').html('<div id="loader"><img src="./build/css/loader.gif" alt="loading..."></div>');

    var username = $('#ghusername').val();
    var GitHub = new Git(username);
    var requri = GitHub.gitUser();
    var repouri = GitHub.gitRepos();

    GitHub.requestJSON(requri, function(json) {
      if(json.message === "Not Found" || username === '') {
        $('#ghapidata').html("<h2>No User Info Found</h2>");
      } else {
        var fullname   = json.name;


        if(fullname === undefined) { fullname = username; }

        var outhtml = '<h2>'+fullname+' <span class="smallname">(@<a href="'+json.html_url+'" target="_blank">'+username+'</a>)</span></h2>';
        outhtml = outhtml + '<div class="ghcontent"><div class="avi"><a href="'+json.html_url+'" target="_blank"><img src="'+json.avatar_url+'" width="80" height="80" alt="'+username+'"></a></div>';
        outhtml = outhtml + '<p>Followers: '+json.followers+' - Following: '+json.following+'<br>Repos: '+json.public_repos+'</p></div>';
        outhtml = outhtml + '<div class="repolist clearfix">';

        var repositories;
        $.getJSON(repouri, function(json){
          repositories = json;
          outputPageContent();
        });

        function outputPageContent() {
          if(repositories.length === 0) { outhtml = outhtml + '<p>No repos!</p></div>'; }
          else {
            outhtml = outhtml + '<p><strong>Repos List:</strong></p> <ul>';
            $.each(repositories, function(index) {
              outhtml = outhtml + '<li><a href="'+repositories[index].html_url+'" target="_blank">'+repositories[index].name + '</a></li>';
            });
            outhtml = outhtml + '</ul></div>';
          }
          $('#ghapidata').html(outhtml);
        }
      }
    });
  });
});


