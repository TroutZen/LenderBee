var React 	= require('react');
var Reflux 	= require('reflux');
var actions = require('../actions/actions.js');
var makeUrl = require('make-url');
var api 		= require('../utils/url-paths');
var request = require('superagent');

var userStore = Reflux.createStore({
	listenables: [actions],

	data: {},

	// initializes user information
	onMountUser: function(data){
	  var url = "/api/users/init/" + data.id + "";
	  request.get(url, function(err, res){
	    if ( err ) {
	      console.err('error trying to get item information for user', err);
	    }
	    else {
	      actions.randomItems(res.body.id);
	      this.data = res.body;
	      this.trigger(this.data);
	      this.getProp('id');
	    }
	  }.bind(this));
	}, 
	
	// getter for the attributes in the current store
	getProp: function(prop) {
		return this.data[prop] ? this.data[prop] : null;
	},

	getInitialState: function() {
		return this.data;
	}
});

module.exports = userStore;