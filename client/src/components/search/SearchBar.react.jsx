var React = require('react');
var Reflux = require('reflux');
var actions = require('../../actions/actions');
var searchStore = require('../../stores/searchStore');
var SearchResults = require('./SearchResults.react.jsx');
var Router = require("react-router");

var searchBar = React.createClass({
 
 mixins: [Reflux.connect(searchStore), Router.Navigation],
 
 handleSubmit: function() {
  actions.searchSubmit($('#searchBar').val());
  this.transitionTo('SearchResults')
  //TODO: Connect to DB and display items
 },

  render: function() {
    return (
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Search for..." id="searchBar" />
        <span className="input-group-btn">
          <button className="btn btn-warning" type="submit" onClick={this.handleSubmit}>Go!</button>
        </span>
      </div>
    )
  }
});

module.exports = searchBar;






