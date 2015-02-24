/* API Endpoint Urls for easier referencing */

// var makeUrl = require('make-url');

var api = {};

api.user = {
	signup: '/api/users/signup',
	signin: '/api/users/signin',
	update: '/api/users/:username',
	delete: '/api/users/:username'
};

api.items = {
	create: '/api/items/:user',
	search: '/api/items/:title',
	fetch: '/api/items/user/:user'
	// 'return': '/api/items'
};

api.messages = {
	create: '/api/messages/:user/:item',
	fetch: '/api/messages/:user/:item'
};

api.reviews = {
	fetchOutstandingReviews: '/api/reviews/user/:user'
};

api.notifications = {

};

module.exports = api;