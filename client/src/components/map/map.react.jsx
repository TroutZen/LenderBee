var React = require('react');
var Reflux = require('reflux');
var mapStore = require('../../stores/map');
var actions = require('./../../actions/actions');
var SearchBar = require('../search/SearchBar.react.jsx');


var map = React.createClass({

	mixins: [Reflux.connect(mapStore)],

  componentDidMount: function() {
      $(".carousel").remove();
      var mapOptions = {center: new google.maps.LatLng(37.7836245,-122.4089988), zoom: 13};
      var gMap = new google.maps.Map(this.getDOMNode(), mapOptions);
      actions.mapMounted(gMap);
  },

  render: function() {
    return (
      <div className="map-container"/>
    )
  }
});

module.exports = map;
