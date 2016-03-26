var React = require('react');
var Route = require('react-router').Route;

var Tasks = require('../../../../components/Plan/Tasks.jsx');

var TasksRoute = React.createClass({
	render: function () {
		return (
			<Route path="tasks" component={Tasks} />
		)
	}
});

module.exports = TasksRoute;