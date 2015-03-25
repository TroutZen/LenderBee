var React 				= require('react');
var Reflux 				= require('reflux');
var actions 			= require('../../actions/actions.js');
var reviewsStore 	= require('../../stores/reviews.js');
var Review 				= require('./review.react.jsx');

var Reviews = React.createClass({	

	// [Tip] This mixin will automatically listen for triggers form the reviewStore
	mixins: [Reflux.connect(reviewsStore)],

	componentWillMount: function() {
		actions.fetchPendingReviews();		
	},

	getInitialState: function() {
		return {};
	},

	// [Note] We need to be rendering the pendingReviews, not the reviews for the current user
	render: function() {
		var pendingReviews;

		var fontSize = {
			fontSize: "18px"
		}

		if (this.state.pendingReviews !== null) {
			var pendingReviews = this.state.pendingReviews.map(function(review){
				return <Review review={review} />
			});
		}
		return (
			<div className="ui center aligned segment" style={fontSize}>
				{pendingReviews}
			</div>
		);
	}

});

module.exports = Reviews;