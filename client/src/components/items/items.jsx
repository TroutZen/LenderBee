var Reflux 					= require('reflux');
var React 					= require('react');
var request 				= require('superagent');
var Items_borrowed  = require('./items_borrowed.jsx');
var Items_lent 			= require('./items_lent.jsx');
var Items_inventory = require('./items_inventory.jsx');
var itemsStore 			= require('../stores/items.js');


var Items = React.createClass({

	// listen for events from the itemsStore
	mixins: [Reflux.connect(itemsStore)],

	render: function() {
		return (
			<div></div>
		);
	}

});

module.exports = Items;