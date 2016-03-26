var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var BrowserHistory = require('react-router').browserHistory;

var Routes = require('./routes/index.jsx');

function scrollToTop () {
    window.scrollTo(0, 0);
}

var AppRouter = React.createClass({
	render: function () {
		return (
			<Router onUpdate={scrollToTop} history={BrowserHistory} routes={Routes} />
		);
	}
});

module.exports = AppRouter;