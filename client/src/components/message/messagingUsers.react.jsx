var React = require('react');
var Reflux = require('reflux');
var messagingUsersStore = require('./../../stores/messagingUsersStore.js');
var actions = require('./../../actions/actions.js');
var Router = require('react-router');
var Link = Router.Link;

var User = React.createClass({
  propTypes: {
    userInfo: React.PropTypes.object
  },

  handleClick: function() {
    actions.conversationCalled(this.props.partnerId, this.props.partnerName);
  },
  
  render: function(){
    return (
        <div>
        <Link to="messageUser" partnerName={this.props.partnerName} partnerId={this.props.partnerId} >
        <div className="large fluid ui teal button" onClick={this.handleClick}><i className="mail outline icon"></i>{this.props.partnerName}</div>
        </Link>
        <div className="ui divider"></div>
        </div>
      )
  }
});

var MessagingUsers = React.createClass({

  mixins: [Reflux.connect(messagingUsersStore)],

  componentDidMount: function() {
    actions.fetchConversations();
  },

  render: function(){

    var partners = this.state.partners.map(function(partner) {
      return (<div><User partnerId={partner.id} partnerName={partner.username}/></div>);
    });

    return (
      <div>
        <div className="ui center aligned segment">
          <h2 className="ui horizontal header divider">Messages</h2>
        </div>
        <div className="ui segment messageButton">
        {partners}
        </div>
      </div>
    )
  }
});

module.exports = MessagingUsers;
