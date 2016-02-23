(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Git = function(user) {
  this.gitUserPath = 'https://api.github.com/users/';
  this.user = user;
};

Git.prototype.gitUser = function() {
   return this.gitUserPath + this.user;
};

Git.prototype.gitRepos = function() {
  return this.gitUserPath + this.user + '/repos';
};

Git.prototype.requestJSON = function(url, callback) {
  $.ajax({
    url: url,
    complete: function(xhr) {
      callback.call(null, xhr.responseJSON);
    }
  });
};

exports.Git = Git;

},{}],2:[function(require,module,exports){
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
            outhtml = outhtml + '<p><strong>Repos List:</strong></p> <ul id="test">';
            $.each(repositories, function(index) {
              outhtml = outhtml + '<li class="repo">'+repositories[index].name + '</li>';
            });
            outhtml = outhtml + '</ul></div>';
          }
          $('#ghapidata').html(outhtml);
        }
      }
    });
  });
  $( "#ghapidata" ).on( "mouseenter", ".repo", function() {
    console.log(this)
    $( "#details" ).append( "<p>Another paragraph!</p>" );
  });

  $( "#ghapidata" ).on( "mouseleave", ".repolist", function() {
    $( "#details" ).empty();
  });
});

$(document).ready(function(){
  $('#time').text(moment());
});

},{"./../js/git.js":1}]},{},[2]);
