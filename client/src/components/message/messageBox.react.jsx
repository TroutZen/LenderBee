var React = require('react');
var Reflux = require('reflux');
var messagingStore = require('./../../stores/messagingStore.js');
var actions = require('./../../actions/actions.js');

var MessageBox = React.createClass({
  
  mixins: [Reflux.connect(messagingStore)],

  handleSubmit: function(e) {
    e.preventDefault();
    actions.messageFormSubmitted($('#messageBoxText').val(), this.props.to);
  },

  render: function(){
    return (
      <form className="ui reply form messageBox" onSubmit={this.handleSubmit}>
          <div className="field">
            <textarea placeholder="Send a Message..." id="messageBoxText"></textarea>
          </div>
          <div className="ui yellow labeled submit icon button" onClick={this.handleSubmit}>
            <i className="icon edit"></i>Send Message
          </div>
        </form>
    )
  }
});

module.exports = MessageBox;

