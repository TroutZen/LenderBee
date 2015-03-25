var React = require('react');
var Reflux = require('reflux');
var postItemStore = require('../stores/postItemStore');
var SuccessMessage = require('../components/app/successMessage.react.jsx');
var actions = require('../actions/actions');

var PostPage = React.createClass({

  mixins: [Reflux.connect(postItemStore)],

  handlePostSubmit: function(e) {
   e.preventDefault();
   actions.postFormSubmitted($('#itemPostTitle').val(), $('#itemPostDescription').val(), 
    $('#itemPostBeeBucks').val());
  },

  render: function() {
    return (
      <div>
      <SuccessMessage message="Item Posted!" /> 
      <div className="ui center aligned segment"><h2 className="ui horizontal header divider">Post an Item</h2></div>
      <form className="postForm" onSubmit={this.handlePostSubmit}>
      <div className="ui fluid form yellow segment">
        <div className="two fields">
          <div className="field">
            <label for="itemName">Enter Item</label>
            <input type="text" className="form-control" id="itemPostTitle" placeholder="Enter Item Name (ie 'Hammer')" name="title" />
          </div>
          <div className="field">
            <label for="exampleInputEmail1">Enter BeeBucks</label>
            <input type="number" min="1" step="1" className="form-control" id="itemPostBeeBucks" placeholder="$$$" name="beebucks" />
          </div>
        </div>
        <div className="one field">
          <label for="itemName">Enter Description</label>
          <textarea className="form-control" id="itemPostDescription" rows="3" placeholder="Describe Your Item" name="description"></textarea>
        </div>
        <div className="one field">
          <label for="exampleInputFile">Add Photos</label>
          <div className="ui yellow labeled icon button">Choose a file <i className="file image outline icon"></i></div>
        </div>
        <div className="ui vertical segment">
          <p></p>
        </div>
        <div className="putMiddle"><button type="submit" className="massive ui green basic button" onClick={this.handlePostSubmit}>Submit</button></div>
      </div>
      </form>
      </div>
    );
  }
});

module.exports = PostPage;