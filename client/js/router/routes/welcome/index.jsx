var React = require('react');
var Route = require('react-router').Route;

var Welcome = require('../../../components/Welcome/index.jsx');

var WelcomeRoute = React.createClass({
	render: function () {
		return (
			<Route path="welcome" component={Welcome} />
		)
	}
});

module.exports = WelcomeRoute;