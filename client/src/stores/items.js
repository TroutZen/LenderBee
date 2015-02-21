/* The Items store holds the items lent, items, borrowed, and items_inventory information for the signed in user */
var Reflux 	= require('reflux');
var React 	= require('react');
var request = require('superagent');
var actions = require('../actions/actions.js');
var api 		= require('../utils/url-paths.js');
var makeUrl = require('makeUrl');
var userStore = require('./user');

var itemStore = Reflux.createStore({
	items: null,

	init: function(){
		// Items Store listens for the action 'initializeUser and fetches items afterwards'
		this.listenTo(actions.initializeUser, this.getItems);

		// Listen for changes on the userStore so that when the user data is fetches, it will kick off the request to get items
		this.listenTo(userStore, this.getItems);
	},

	getItems: function(){
		request.get(makeUrl(api.items.fetch, user_id: 'ENTER_USER_ID_HERE'), function(err, res){
			if ( err ) {
				console.err('Error trying to get item information for user', err);
			}
			else {
				this.items = res.items;
				this.trigger(this.items);
			}
		});	
	},

	getInitialState: function() {
		return {
			items : this.items 
		};
	}
	
});

module.exports = itemStore;


