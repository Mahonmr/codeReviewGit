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
