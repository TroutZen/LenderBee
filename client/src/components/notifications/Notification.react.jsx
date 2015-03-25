var React = require('react');
var Reflux = require('reflux');
var actions = require("./../../actions/actions.js");
var notificationStore = require("./../../stores/notificationsStore.js");

var Notification = React.createClass({

	mixins: [Reflux.connect(notificationStore)],

	handleAccept: function() {
		actions.itemRequestAccepted(this.props.borrowerId, this.props.itemId);
	}, 

	handleDecline: function() {
	 actions.itemRequestDeclined(this.props.borrowerId, this.props.itemId);
	},

	render: function() {
		return (
			<div className="ui compact segment" ref="notif">
			  <img className="ui avatar image" src={this.props.fbpicture} /><p>{this.props.borrowerName} wants to borrow your {this.props.itemName + "   "}  </p>
			  <div className="positive ui toggle button" itemId={this.props.itemId} name={this.props.name} onClick={this.handleAccept}>Accept</div>
				<div className="negative ui toggle button" itemId={this.props.itemId} name={this.props.name} onClick={this.handleDecline}>Decline</div>
			</div>
		);
	}
});

module.exports = Notification;