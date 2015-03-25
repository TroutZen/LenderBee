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
		this.setState({
			items: items
		});
	},

	getInitialState: function() {
		return {
			items: null 
		};
	},

	render: function() {
		console.log('state from within the items component', this.state);
		var items;

		if (this.state.items) {
			items = _.map(this.state.items, function(item, key) {
				var ItemCategory;
				if (key === 'borrowed') {
					ItemCategory = <Borrowed item={item}/>;
				} 
				else if ( key === 'lent' ) {
					ItemCategory = <Lent item={item}/>;
				} 
				else if ( key === 'inventory') {
					ItemCategory = <Inventory item={item}/>;
				}
				return ItemCategory;
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
