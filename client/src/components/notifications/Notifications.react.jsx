var React 						= require('react');
var Reflux						= require('reflux');
var Notification 			= require('./Notification.react.jsx');
var notificationStore = require('../../stores/notifications.js');
var actions 					= require('../../actions/actions.js');

var Notifications = React.createClass({
	// this will cause setState({list:updatedlist}) whenever the store does trigger(updatedlist)
	mixins: [Reflux.connect(notificationStore)],

	// [Tip] Called before render
	componentWillMount: function() {
			// [Note] Fetches notifications before render
			actions.fetchNotifications();		
	},

	// We need to be able to connect to the user store, the messages store, the notification store, the review store
	render: function() {
		var notifications = this.state.notifications.map(function(notification){
			return <Notification src={notification.src} name={notification.name} item={notification.item}/>
		});

		return (
			<div>
				<h1>Notifications</h1>
				{notifications}
			</div>
		);
	}

});

module.exports = Notifications;
