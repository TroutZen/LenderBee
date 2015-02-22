var React = require('react');

var Items_inventory = React.createClass({

	render: function() {
		return (
			<div>
				{/* I want to be able to show lender information including avatar and name, so we need our endpoint to also fetch user data */}
				<span>{this.props.item.title}</span>
				<span>{this.props.item.description}</span>
				{/* We need to be able to adjust the pollen price as needed */}
				<span>{this.props.item.pollenprice}</span>
			</div>
		);
	}

});

module.exports = Items_inventory;
