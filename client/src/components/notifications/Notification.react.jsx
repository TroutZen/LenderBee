var React 	= require('react');
var actions = require('../../actions/actions.js');

var Notification = React.createClass({

	// what information will be displayed in the notification?
	// img url for img tag
	// borrower name
	// item description
	
	handleAccept: function(){
		actions.acceptRequestToBorrow();
	},

	handleDecline: function(){
		actions.declineRequestToBorrow();
	},

	render: function() {
		return (
			<div>
				<img src={this.props.src}/>
				<p>{this.props.name}</p>
				<p>{this.props.item}</p>
				<button onClick={this.handleAccept}>Accept</button>
				<button onClick={this.handleDecline}>Decline</button>
			</div>
		);
	}

});

module.exports = Notification;