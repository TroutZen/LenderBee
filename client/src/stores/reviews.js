var React = require('react');
var Reflux = require('reflux');
var request = require('super-agent');
var actions = require('../actions/actions.js');

var reviewStore = React.createStore({

	reviews: null,

	init: function(){
		this.listenTo(actions.initializeUser, this.getReviews);
	},

	getReviews: function(){
		/**
			TODO:
			- In this request for review data, we also need the controller to give us the name of the reviewers for each review
		**/
		
		_fake_getReviews.call(this, function(reviews){
			this.reviews = reviews;
			this.trigger(this.reviews);
		});
		// fetch reviews from reviews api
		// request.get('/api/:user_id/reviews', function(err, res){
		// 	if (err) {
		// 		console.log('error fetching reviews for user', err);
		// 	} else {
		// 		this.reviews = res.data; /* need to confirm how this data will come back */
		// 	}
		// });
		
	},

	_fake_getReviews: function(next){
		setTimeout.call(this, function(){
			var reviews = {
				_id: "0",
				name: 'Turd Furgeson',
				reviewer_id: "1",
				reviewee_id: "2",
				rating: 3.5,
				message: "Yeah this was the best lender I have ever had, I really enjoyed borrowing his car and joy-riding it all over town",
				created_at: new Date();
			};

			next(reviews);
		}, 100);
	},

	getInitialState: function() {
		return this.reviews;
	}


});

module.exports = reviewStore;