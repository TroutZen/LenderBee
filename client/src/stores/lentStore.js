var actions = require('../actions/actions');
var request = require('superagent');
var Reflux = require('reflux');

var lentStore = Reflux.createStore({
    listenables: [actions],
    data: {items: []},

    onRequestLentPage: function() {
      var that = this;
        request("/api/items/:user", function(res){
          that.data.items = JSON.parse(res.text);
          that.trigger(that.items);
        })
      },

    getInitialState: function() {
        return this.data;
    }
});

module.exports = lentStore;
