var React = require('react');
var Route = require('react-router').Route;

var Terms = require('../../../../components/Plan/Terms.jsx');

var TermsRoute = React.createClass({
	render: function () {
		return (
			<Route path="terms" component={Terms} />
		)
	}
})

module.exports = TermsRoute;