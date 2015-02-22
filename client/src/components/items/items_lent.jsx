var React = require('react');

var Items_lent = React.createClass({

	render: function() {
		return (
			<div>
				{/* I want to be able to show lender information including avatar and name, so we need our endpoint to also fetch user data */}
				<span>{this.props.item.title}</span>
				<span>{this.props.item.description}</span>
				<span>{this.props.item.pollenprice}</span>
				<span>{this.props.item.borrower_id}</span>
			</div>
		);
	}

});

module.exports = Items_lent;