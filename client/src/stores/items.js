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
		this.listenTo(actions.fetchItems, this.fetchItems);
		this.listenTo(actions.returnItem, this.returnItem);
	},

	// fetches items from api
	fetchItems: function(){
		var userId = userStore.getProp('id');
		
		request.get(makeUrl(api.items.fetch, {user: userId}), function(err, res){
			if ( err ) {
				console.err('error trying to get item information for user', err);
			}
			else {
				this.filterItems(res.body);
			}
		}.bind(this));	
	},

	// returns item updating the item information
	returnItem: function(lender_id, borrower_id, itemsId){
		request.put(makeUrl(api.items.update, {itemsId: itemsId}), function(err, res){
				this.createReviews(lender_id, borrower_id, itemsId);
		}.bind(this));
	},

	// generates reviews
	createReviews: function(lender_id, borrower_id, item_id){
		request.post(makeUrl(api.reviews.createPending, {lender_id: lender_id, borrower_id: borrower_id, item_id: item_id}), function(err, res){
			if (err) {
				console.error('[error] creating reviews');
			} else {
				this.fetchItems();
			}
		}.bind(this));
	},

	// Filters Items into lent, borrowed, inventory
	filterItems: function(items){
		var filteredItems = {};
		var userId = userStore.getProp('id');
		items.forEach(function(item){
			if (userId === item.lender_id) {
				if (item.borrowed) {
					filteredItems.lent = filteredItems.lent || [];
					filteredItems.lent.push(item);
				} else {
					filteredItems.inventory = filteredItems.inventory || [];
					filteredItems.inventory.push(item);
				}
			}
			else if (userId === item.borrower_id) {
				filteredItems.borrowed = filteredItems.borrowed || [];
				filteredItems.borrowed.push(item);
			}
		});

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
