var React = require('react');
var Reflux = require('reflux');
var request = require('superagent');
var actions = require('../actions/actions.js');
var userStore   = require('./user.js');

var singleItemStore = Reflux.createStore({

  data: {item: {}, lender: {}},

  listenables: [actions],

  // sets state when the user selects an item
  onSelectItem: function(item, lender) {
   this.data.item = item;
   this.data.lender= lender;
   this.trigger(this.data);   
  }, 

  // sends notification to lender
  onItemRequestSubmitted: function(itemId, userId) {
    request.post("/api/notifications/" + "" + itemId + "/" + userId + "", function(res) {
      if (res.ok) {
        $('#successMessage').addClass("success");
      }
    })
  },

  getInitialState: function(){
    return this.data;
  }

})

module.exports = singleItemStore;
