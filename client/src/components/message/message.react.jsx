var React = require('react');
var Reflux = require('reflux');
var messageStore = require('./../../stores/messageStore.js');
var actions = require('./../../actions/actions.js');

var message = React.createClass({

  render: function(){
    return (
      <div className="comment">
         <a className="avatar">
           <img src={this.props.fbpicture} />
         </a>
         <div className="content">
           <a className="author">{this.props.fromName}</a>
           <div className="text">
             <p>{this.props.message}</p>
           </div>
         </div>
        </div>
    )
  }
});

module.exports = message;
