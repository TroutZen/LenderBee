var React 			= require('react');
var Router 			= require('react-router');
var HomePage 		= require('./HomePage.react.jsx');

/* Defines Top Level App Component */
var APP = React.createClass({
	componentWillMount: function() {
	},

	render: function(){
		return (
				<div>
					<HomePage/>
				</div>
			);
	}
});

module.exports = APP;