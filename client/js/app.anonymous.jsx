var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var IndexRoute = require('react-router').IndexRoute;

var Header = require('./components/Header/Index.jsx');
var Footer = require('./components/Footer/Index.jsx');

var MobileNavigation = React.createClass({
    render: function () {
        var headerSpacingStyle = {
            paddingTop: "60px"
        };
        return (
            <div style={headerSpacingStyle} className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
                <Navigation />
            </div>
        );
    }
});

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

var Routes = (
  <Route path="/" component={App}>
  </Route>
);

ReactDOM.render(
 	<Router history={browserHistory} routes={Routes} />,
	document.getElementById("container")
);
