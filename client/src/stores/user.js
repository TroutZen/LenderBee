var React = require('react');
var Reflux = require('reflux');
var actions = require('../actions/actions.js');

var userStore = Reflux.createStore({
	init: function(){

	},

	getInitialState: function() {
		return {};
	}
});

module.exports = userStore;