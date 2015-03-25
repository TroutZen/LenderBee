var React       = require('react');
var Reflux      = require('reflux');
var reviewStore = require('../../stores/reviewStore.js');
var actions     = require('../../actions/actions.js');
var Router      = require('react-router');
var ReviewBox   = require('./reviewBox.react.jsx');
var Rating      = require('./rating.react.jsx');
var SuccessMessage = require('../app/successMessage.react.jsx');

var review = React.createClass({

  mixins: [Router.Navigation],
  
  selectRating: function(rating){
    this.setState({
      selectedRating: rating 
    });
  },


  getInitialState: function() {
    return {
      selectedRating: null 
    };
  },

  render: function() {

    var firstName = this.props.review.reviewee.firstname;
    var lastName  = this.props.review.reviewee.lastname;
    firstName[0]  = firstName[0].toUpperCase();
    lastName[0]   = lastName[0].toUpperCase();
    var fbpic = this.props.review.reviewee.fbpicture;
    
    return (
      <div>
      <SuccessMessage message="Thanks for Reviewing!  " />
      <div className="ui vertical segment">
        <img className="ui small centered circular bordered image" src={fbpic} />
        <i className="user icon"></i>
        <span>{firstName + lastName}</span>
        <div>
          <i className="tag icon"></i>
          {this.props.review.item.title}
        </div>
        <Rating data={this.props.review} selectRating={this.selectRating} selectedRating={this.state.selectedRating}/>
        <ReviewBox reviewId={this.props.review.id} selectedRating={this.state.selectedRating}/>
      </div> 
      </div>
    )
  }
});

module.exports = review;