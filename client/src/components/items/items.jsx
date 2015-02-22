var Reflux 					= require('reflux');
var React 					= require('react');
var request 				= require('superagent');
var Borrowed  			= require('./items_borrowed.jsx');
var Lent 						= require('./items_lent.jsx');
var Inventory 			= require('./items_inventory.jsx');
var itemsStore 			= require('../../stores/items.js');
var actions					= require('../../actions/actions.js');
var _ 							= require('lodash');


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
			items: items
			// lent: items.lent,
			// borrowed: items.borrowed,
			// inventory: items.inventory
		});
	},

	getInitialState: function() {
		return {
			items: null 
		};
	},

	render: function() {
		var items;
		console.log(this.state);
		if (this.state.items) {
			/* BUG: This is incorrect, I need to use map and I need to map over an object not an array */
			items = this.state.items.forEach(function(item) {
				return (
						<div>
							<Borrowed item={item}/>
							<Lent item={item}/>
							<Inventory item={item}/>
						</div>	
					);
			}); 			
		}
		return (
			<div>
				{items}
			</div>
		);
	}

});

module.exports = Items;