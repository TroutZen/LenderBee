var React       = require('react');
var Reflux      = require('reflux');
var reviewStore = require('../../stores/reviewStore.js');
var actions     = require('../../actions/actions.js');
var Rating      = require('./rating.react.jsx');
var RatingStarStatic = require('./ratingStarStatic.react.jsx');
var SmallStarRating = require('./SmallStarRating.react.jsx');

var review = React.createClass({

  mixins: [Reflux.connect(reviewStore)],

  render: function(){
    console.log('review from within single review', this.props.review);
    var user = this.props.review.reviewer;
    return (
        <div className="ui vertical segment">
          <div>
            <img className="ui bordered avatar image profile" src={user.fbpicture}></img>
          </div>  
          <span>{user.username}</span>
          <SmallStarRating rating={user.rating}/>
          <div className="ui warning message">
            <p>{this.props.review.review}</p>
          </div>
        </div>
    );
  }
});

module.exports = review;