var React = require('react');
var Reflux = require('reflux');
var reviewStore = require('../../stores/reviews.js');
var actions = require('../../actions/actions.js');


// var reviews = {
//   _id: "0",
//   reviewer_id: "1",
//   reviewee_id: "2",
//   rating: 3.5,
//   message: "Yeah this was the best lender I have ever had, I really enjoyed borrowing his car and joy-riding it all over town",
//   created_at: new Date();
// };

var reviews = React.createClass({

  //listens to reviewStore
  mixins: [Reflux.connect(reviewStore)],

  render: function(){
    return (
      <div>
        <p>{this.props.review._id}</p> {/* How do we get the user name for the reviewer? */}
        <div>{this.props.review.message}</div>
      </div>
    )
  }
});

module.exports = reviews;
