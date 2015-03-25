var actions = require('../actions/actions.js');
var request = require('superagent');
var Reflux  = require('reflux');
var makeUrl = require('make-url');
var api     = require('../utils/url-paths');
var userStore = require('./user.js');

var postItemStore = Reflux.createStore({

  listenables: [actions],
  data: {items: []},
  
  init: function() {
  },

  onPostFormSubmitted: function(title, description, price, photos) {
    var userId = userStore.getProp('id');
    request.post(makeUrl(api.items.create, {userId: userId}))
     .send({'title': title, 'description': description, 'beebucks': price})
     .end(function(err, res) {
        $('#itemPostTitle').val("");
        $('#itemPostDescription').val("");
        $('#itemPostBeeBucks').val("");
        $('#successMessage').addClass("success");
        $('#successMessage').fadeIn(5000, function() {});
     });
    }
});

module.exports = postItemStore;