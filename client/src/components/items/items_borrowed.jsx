var React = require('react');
var _			= require('lodash');

var ItemBorrowed = React.createClass({

	render: function(){

		// <div>
		// 	<i className="circular gift icon"></i>
		// 	<span>{this.props.item.title}</span>
		// 	<div>
		// 		<span>Description: {this.props.item.description}</span>
		// 	</div>
		// 	<div>
		// 		<i className="circular money icon"></i>
		// 		<span>{this.props.item.beebucks}</span>
		// 	</div>
		// 	<p>Lender: {this.props.item.lender_id}</p>
		// </div>
		// 
		// var imgStyle = {
		// 	maxHeight: "200px",
		// 	overflow: "hidden",
		// 	objectFit: "cover",
		// }
		
		var relativeStyle = {
			position: "relative"
		};

		var absolute = {
			position: "absolute"
		};

		var topleft = {
			top: "0",
			left: "0"
		};

		return (
			<div className="column">
				<div className="ui center aligned segment">
					<div style={relativeStyle}>
						<img className="ui bordered rounded medium image" src={this.props.item.imageurl}></img>
						<div className="ui left aligned small segment">
							<div style={absolute} style={topleft}>					
								<i className="circular gift icon"></i>
								<span>{this.props.item.title}</span>
							</div>
							<span>Description: {this.props.item.description}</span>
							<i className="circular money icon"></i>
							<span>{this.props.item.beebucks}</span>
							<span>Lender: {this.props.item.lender_id}</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
});


var AllItemsBorrowed = React.createClass({

		// <h2 className="ui horizontal header divider">
	 //  	Currently Borrowed
		// </h2>

	render: function() {
		// console.log('Items container with props', this.props.item);
		var borrowedItems = _.map(this.props.item, function(item){
			return <ItemBorrowed item={item}/>;
		});

		return (
			<div className="ui centered stackable four column page grid">
				{borrowedItems}
			</div>
		);
	}

});

module.exports = AllItemsBorrowed;