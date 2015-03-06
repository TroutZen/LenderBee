var React = require('react');
var Reflux = require('reflux');
var actions = require('../../actions/actions');
var navStore = require('../../stores/navStore');
var SideNavBar = require('./SideNavBar.react.jsx');
var Router = require('react-router');
var Link = Router.Link;

var TopBar = React.createClass({
  mixins: [Reflux.connect(navStore)],
  
  handleSideNavClick: function(evt) {
    actions.toggleSideNav();
  },


      // <div id="topbar" className="ui menu">
      //   <div className="item">
      //   </div>          
      // </div>
      // <i className="align justify icon large" onClick={this.props.toggleSideNavBar}></i>     

  render: function() {
    var imgStyle = {
      width: "25px",
      height: "25px",
      display: "inline-block"
    };

    var beeStyle = {
      display: "inline-block"
    };

    var topbarPadding = {
      padding: "0.5em"
    }

    return (
      <div style={topbarPadding} id="topbar" className="ui segment">
        <img style={imgStyle} className="ui mini image" src="/dist/assets/hivebar.png" onClick={this.props.toggleSideNavBar}></img>
        <img style={beeStyle} className="ui tiny image" src="/dist/assets/bee_transparent.png"></img>
      </div>
    );
  }
});

module.exports = TopBar;