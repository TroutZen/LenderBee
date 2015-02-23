var React = require('react');
var _			= require('lodash');

var ItemBorrowed = React.createClass({
	render: function(){
		return (
			<div>
				{/* I want to be able to show lender information including avatar and name, so we need our endpoint to also fetch user data */}
				<span>{this.props.item.title}</span>
				<span>{this.props.item.description}</span>
				<span>{this.props.item.pollenprice}</span>
				<span>{this.props.item.lender_id}</span>
			</div>
		);
	}
});


var AllItemsBorrowed = React.createClass({

	render: function() {
		// console.log('Items container with props', this.props.item);
		var borrowedItems = _.map(this.props.item, function(item){
			return <ItemBorrowed item={item}/>;
		});

		return (
			<div>
				{borrowedItems}
			</div>
		);
	}

});

module.exports = AllItemsBorrowed;