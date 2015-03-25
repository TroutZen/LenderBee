var React 			= require('react');
var Reflux 			= require('reflux');
var request 		= require('superagent');
var actions 		= require('../actions/actions.js');
var userStore		= require('./user.js');
var makeUrl			= require('make-url');
var api					= require('../utils/url-paths.js');

var reviewStore = Reflux.createStore({

	data: {
		reviews: null,
		pendingReviews: null
	},

	init: function(){
		this.listenTo(actions.fetchReviews, this.onFetchReviews);
		this.listenTo(actions.fetchPendingReviews, this.onFetchPendingReviews);
		this.listenTo(actions.reviewFormSubmitted, this.onReviewFormSubmitted)
	},

	// [Note] Should fetch all pending reviews where the user needs to complete the reviews
	onFetchPendingReviews: function(){
		var userId = userStore.getProp('id');
		request.get(makeUrl(api.reviews.fetchOutstandingReviews, {user: userId}), function(err, res){
			if (err) {
				console.error('error: fetching pending reviews for user', err);
			}
			else {
				this.data.pendingReviews = res.body;
				this.trigger(this.data);
			}
		}.bind(this));
	},

	onFetchReviews: function(){
	  var userId = userStore.getProp('id');
	  request.get(makeUrl(api.reviews.getReviews, {user: userId}), function(err, res){
	    if(err) {console.error('error fetching reivew information', err);}
	    else {
	      this.data.reviews = res.body;
	      this.trigger(this.data.reviews);
	    }
	  }.bind(this));
  },

	onReviewFormSubmitted: function(reviewId, review, rating) {
		request.put("/api/reviews/"+ reviewId + "/update")
			.send({'review': review, 'rating': rating})
			.end(function(err, res) {
		      	$('#reviewBoxText').val("");
		      	$('#successMessage').addClass("success");
						actions.fetchPendingReviews();
		     });
	},

	getInitialState: function() {
		return this.data;
	}
});

module.exports = reviewStore;
