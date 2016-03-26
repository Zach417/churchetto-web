var React = require('react');
var Route = require('react-router').Route;

var Profile = require('../../../components/Profile/index.jsx');

var ProfileRoute = React.createClass({
	render: function () {
		return (
			<Route path="profile" component={Profile} />
		)
	}
});

module.exports = ProfileRoute;