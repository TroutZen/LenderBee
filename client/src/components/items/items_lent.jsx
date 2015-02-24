var React 			= require('react');
var actions 		= require('../../actions/actions.js');
var _						= require('lodash');

var LentItem = React.createClass({

	// [Note] ReturnItem Needs to do the following:
			// make a put request to server which updates the item record with the following:
					// borrowed set to false
					// sets borrower_id to null
			//  
	returnItem: function(){
		actions.returnItem();
	},

	render: function() {
		return (
			<div>
				<h5>Lent Item</h5>
				{/* I want to be able to show lender information including avatar and name, so we need our endpoint to also fetch user data */}
				<p>{this.props.item.title}</p>
				<p>{this.props.item.description}</p>
				<p>{this.props.item.pollenprice}</p>
				<p>{this.props.item.borrower_id}</p>
				<button onClick={this.returnItem}>Item Was Returned</button>
			</div>
		);
	}
});

var Items_lent = React.createClass({
	render: function() {

		var LentItems = _.map(this.props.item, function(item){
			return <LentItem item={item}/>;
		});

		return (
			<div>
				{LentItems}
			</div>
		);
	}

});

module.exports = Items_lent;