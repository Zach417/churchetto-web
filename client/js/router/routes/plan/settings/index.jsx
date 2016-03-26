var React = require('react');
var Route = require('react-router').Route;

var Settings = require('../../../../components/Plan/Settings.jsx');

var SettingsRoute = React.createClass({
	render: function () {
		return (
			<Route path="settings" component={Settings} />
		)
	}
});

module.exports = SettingsRoute;