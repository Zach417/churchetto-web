var React = require('react');
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

var WelcomeRoute = require('./welcome/index.jsx');
var NavigationRoute = require('./navigation/index.jsx');
var PlanRoute = require('./plan/index.jsx');
var ProfileRoute = require('./profile/index.jsx');
var SettingsRoute = require('./settings/index.jsx');

var Header = require('../../components/Header/Index.jsx');
var Footer = require('../../components/Footer/Index.jsx');
var Home = require('../../components/Home/Index.jsx');

var App = React.createClass({
	render: function () {
		return (
			<div>
                <Header />
				{this.props.children}
				<Footer />
			</div>
		)
	}
});

module.exports = (
	<Route path="/" component={App}>
    	<IndexRoute component={Home} />
    	<WelcomeRoute />
    </Route>
)