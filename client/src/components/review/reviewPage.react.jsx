var React = require('react');
var Reflux = require('reflux');
var reviewStore = require('../../stores/reviews.js');
var actions = require('../../actions/actions.js');
var Review = require('./review.react.jsx');

var Reviews = React.createClass({

  componentWillMount: function() {
    // alert('switching to reviewPage view');
  },

  // listens to reviewStore
  mixins: [Reflux.connect(reviewStore)],

  render: function(){
    // creates component for each review and renders them
     var reviews = this.state.reviews.map(function(review) {
      console.log(review);
      return <Review reviewData={review} />;
     });

    return (
      <div>
        <p>Reviews</p>
        {reviews}
      </div>
    )
  }
});

module.exports = Reviews;
