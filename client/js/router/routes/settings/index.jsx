var React = require('react');
var Route = require('react-router').Route;

var Settings = require('../../../components/Settings/index.jsx');

var SettingsRoute = React.createClass({
	render: function () {
		return (
			<Route path="settings" component={Settings} />
		)
	}
});

module.exports = SettingsRoute;