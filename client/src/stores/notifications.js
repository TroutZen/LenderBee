var React 		= require('react');
var Reflux 		= require('reflux');
var actions 	= require('../actions/actions.js');
var faker 		= require('faker');
var request 	= require('superagent');

/* Dummy Data until we can get this wired up to back-end */
_fake_notifications = [
	{
		src: faker.image.imageUrl(),
		name: faker.name.firstName() + faker.name.lastName(),
		item: 'Bicycle'
	},
	{
		src: faker.image.imageUrl(),
		name: faker.name.firstName() + faker.name.lastName(),
		item: 'Hammock'
	},
	{
		src: faker.image.imageUrl(),
		name: faker.name.firstName() + faker.name.lastName(),
		item: 'Honda Accord'
	}
];

var notificationStore = Reflux.createStore({
	// might have to also connect this store to userstore to get the username/user_id info for get request
	listenables: [actions],

	init: function(){
		// this.getNotifications();
	},

	// this will be asynchronous, how do we handle this?
	onFetchNotifications: function(){
		// request.get('/api/some-endpoint', function(res){
		// 	// store this data in the store's state somehow
		// });
	},

	onAcceptRequestToBorrow: function(){
		// Item gets updated with borrower_id
		// Borrower gets notification that item has been accepted
		// Increase BeeBucks by item amount for lender, decrease Beebucks by item amount for lender (Only write to DB if both succeed)
		// [Confirm] Item should now be in borrowers borrowed items
		// [Confirm] Item should now be in lenders lent items 
	},

	onDeclineRequestToBorrow: function(){
		// Should send notification to borrower their request has been declined
			// On Success:
				// Should change state of notification to rejected
				// Client side logic should check if accepted or rejected (if rejected do some css)
	},


	getInitialState: function() {
		return {
			notifications: _fake_notifications
		};
	}
});


module.exports = notificationStore;