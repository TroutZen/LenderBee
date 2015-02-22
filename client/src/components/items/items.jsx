var Reflux 					= require('reflux');
var React 					= require('react');
var request 				= require('superagent');
var Items_borrowed  = require('./items_borrowed.jsx');
var Items_lent 			= require('./items_lent.jsx');
var Items_inventory = require('./items_inventory.jsx');
var itemsStore 			= require('../../stores/items.js');
var actions					= require('../../actions/actions.js');


var Items = React.createClass({

	// Fetch Items will be called before the component is mounted
	componentWillMount: function() {
		// calls fetchItems on actions --> calls fetchItems in itemsStore
		actions.fetchItems();		
	},

	componentDidMount: function() {
		this.unsubscribe = itemsStore.listen(this.updateItems);
	},

	componentWillUnmount: function(){
		this.unsubscribe();
	},

	updateItems: function(items){
		/* items will be an object which exposes items.lent, items.borrowed, items.inventory */
		this.setState({
			lent: items.lent,
			borrowed: items.borrowed,
			inventory: items.inventory
		});
	},

	render: function() {
		return (
			<div>

			</div>
		);
	}

});

module.exports = Items;