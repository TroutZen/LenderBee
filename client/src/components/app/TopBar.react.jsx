var React = require('react');
var Reflux = require('reflux');
var actions = require('../../actions/actions');
var navStore = require('../../stores/navStore');
var SideNavBar = require('./SideNavBar.react.jsx');
var Router = require('react-router');
var Link = Router.Link;
var $ = require('jQuery');

var TopBar = React.createClass({
  mixins: [Reflux.connect(navStore)],
  
  handleSideNavClick: function(evt) {
    actions.toggleSideNav();
  },

  // [Refactor] remove interval on component unmount
  wiggleIndefinitely: function(){
    console.log('within wiggle function');
    var $bee = $(this.refs.bee.getDOMNode());
    setInterval(function(){
      console.log('bee should be wiggling');
      $bee.addClass('tada');
      $bee.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $bee.removeClass('tada');
      });
    }, Math.random() * 10000);
  },

  componentDidMount: function() {
    console.log('topbar mounted');
    this.wiggleIndefinitely();
  },

  render: function() {
    console.log('topbar rendered');
    var imgStyle = {
      width: "22px",
      height: "22px",
      display: "inline-block",
    };

    var beeStyle = {
      display: "inline-block",
    };

    var topbarPadding = {
      padding: "0.5em"
    };

    var titleStyle = {
      paddingTop: "3px",
      fontFamily: 'Pacifico',
      fontSize: "18px"
    };

    return (
      <div style={topbarPadding} id="topbar" className="ui segment">
        <div className="alignleft">
          <img style={imgStyle} className="ui mini image" src="/assets/hivebar.png" onClick={this.props.toggleSideNavBar}></img>
          <img ref="bee" style={beeStyle} className="ui tiny image animated" src="/assets/bee_transparent.png"></img>
        </div>  
        <div>
          <span style={titleStyle} className="aligncenter">LenderBee</span>
        </div>
      </div>
    );
  }
});

module.exports = TopBar;