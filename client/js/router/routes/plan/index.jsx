var React = require('react');
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

var TermsRoute = require('./terms/index.jsx');
var DocumentsRoute = require('./documents/index.jsx');
var TasksRoute = require('./tasks/index.jsx');
var SettingsRoute = require('./settings/index.jsx');

var Plan = require('../../../components/Plan/index.jsx');
var PlanProfile = require('../../../components/Plan/Profile.jsx');

var PlanRoute = React.createClass({
	render: function () {
		return (
			<Route path="plan/:id" component={Plan}>
				<IndexRoute component={PlanProfile} />
				<TermsRoute />
				<DocumentsRoute />
				<TasksRoute />
				<SettingsRoute />
			</Route>
		)
	}
});

module.exports = PlanRoute;