var React = require('react');
var Route = require('react-router').Route;

var Navigation = require('../../../components/Home/Navigation.jsx');

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

var NavigationRoute = React.createClass({
    render: function () {
        return (
            <Route path="navigation" component={MobileNavigation} />
        )
    }
});

module.exports = NavigationRoute;