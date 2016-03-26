var React = require('react');
var Route = require('react-router').Route;

var Documents = require('../../../../components/Plan/Documents.jsx');

var DocumentsRoute = React.createClass({
	render: function () {
		return (
			<Route path="documents" component={Documents} />
		)
	}
});

module.exports = DocumentsRoute;