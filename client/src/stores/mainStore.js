var React = require('react');
var Reflux = require('reflux');
var actions = require('../actions/actions.js');
var request = require('superagent');

var userStore = Reflux.createStore({
  listenables: [actions],

  data: {},

});

module.exports = userStore;