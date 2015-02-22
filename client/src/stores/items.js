var Reflux 	= require('reflux');
var React 	= require('react');
var request = require('superagent');
var actions = require('../actions/actions.js');
var api 		= require('../utils/url-paths.js');
var makeUrl = require('make-url');
var userStore = require('./user');

var itemStore = Reflux.createStore({
	items: null,

	init: function(){
		// Items Store listens for the action 'initializeUser and fetches items afterwards'
		this.listenTo(actions.fetchItems, this.fetchItems);

		// Listen for changes on the userStore so that when the user data is fetches, it will kick off the request to get items
		// this.listenTo(userStore, this.getItems);
	},

	/* Fetches Items from api endpoint */
	fetchItems: function(){
		console.log('/api/items/user/1')
		console.log(makeUrl(api.items.fetch, {user: 1}));
		request.get(makeUrl(api.items.fetch, {user: 1}), function(err, res){
			if ( err ) {
				console.err('Error trying to get item information for user', err);
			}
			else {
				console.log('items', res.body);
				// this.filterItems(res.items);
			}
		});	
	},

	/* Filters Items into lent, borrowed, inventory */
	filterItems: function(items){
		/* Items is an array of item objects */
		var filteredItems = {};
		this.items = filteredItems;
		this.trigger(this.items);
	},


	getInitialState: function() {
		return {
			items : this.items 
		};
	}
	
});

module.exports = itemStore;


