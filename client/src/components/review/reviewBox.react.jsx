var React = require('react');
var Reflux = require('reflux');
var reviewStore = require('./../../stores/reviews.js');
var actions = require('./../../actions/actions.js');

var ReviewBox = React.createClass({
  
  mixins: [Reflux.connect(reviewStore)],

  
  handleSubmit: function(e) {
    e.preventDefault();

    // [Note] Checks to see if the user has selected a rating, won't submit form if they haven't
    if ( this.props.selectedRating ) {
      actions.reviewFormSubmitted(this.props.reviewId, $('#reviewBoxText').val(), this.props.selectedRating);
    } else {
      alert('Please select a user rating');
    }
  },

  render: function(){
    
    var backgroundColorBlue = {
       borderColor: "#FFD34E",
       backgroundColor: "rgba(254, 249, 233, 1)",
       width: "60%"
    }
    return (
      <div className="ui form">
        <div className="field">
          <textarea style={backgroundColorBlue} id="reviewBoxText" placeholder="Leave Review..."></textarea>
        </div> 
        <div className="ui left submit button" onClick={this.handleSubmit}>Submit</div>
      </div>   
    )
  }
});

module.exports = ReviewBox;
