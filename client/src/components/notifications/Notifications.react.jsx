var React 						= require('react');
var Reflux						= require('reflux');
var Notification 			= require('./Notification.react.jsx');
var notificationsStore = require('../../stores/notificationsStore.js');
var actions = require("./../../actions/actions.js");

var Notifications = React.createClass({

	mixins: [Reflux.connect(notificationsStore)],

	componentWillMount: function() {
		actions.getNotifications();
	},

	render: function() {
		var notifications = this.state.notifications.map(function(notification) {
			return <Notification fbpicture={notification.Users[0].fbpicture} borrowerName={notification.Users[0].username} borrowerId={notification.Users[0].id} itemName={notification.title} itemId={notification.id} />
		});
		return (
			<div>
				<div className="ui center aligned segment">
					<h2 className="ui horizontal header divider">Notifications</h2>
				{notifications}
				</div>
			</div>
		)
	}

});

module.exports = Notifications;
