var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var IndexRoute = require('react-router').IndexRoute;

var Footer = require('./components/Footer.Anonymous/Index.jsx');
var ForgotPasswordPage = require('./components/ForgotPassword.Anonymous/Page.jsx');
var Header = require('./components/Header.Anonymous/Index.jsx');
var Home = require('./components/Home.Anonymous/Index.jsx');
var PasswordResetPage = require('./components/PasswordReset.Anonymous/Page.jsx');
var RegisterPage = require('./components/SignUp.Anonymous/Page.jsx');
var RegisterRequest= require('./components/SignUp.Anonymous/Request.jsx');
var RegisterVerify = require('./components/SignUp.Anonymous/Verify.jsx');
var SignInPage = require('./components/SignIn.Anonymous/Page.jsx');

function handleRouterUpdate () {
	$("#menu-sub").slideUp("fast");
	$("#menu-button").text(". . .");
}

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
    <IndexRoute component={Home} />
    <Route path="sign-in" component={SignInPage} />
    <Route path="sign-up" component={RegisterPage}>
        <IndexRoute component={RegisterRequest} />
        <Route path=":id" component={RegisterVerify} />
    </Route>
    <Route path="forgot-password" component={ForgotPasswordPage} />
    <Route path="forgot-password/:id" component={PasswordResetPage} />
    <Route path="*" component={SignInPage} />
  </Route>
);

ReactDOM.render(
 	<Router history={browserHistory} onUpdate={handleRouterUpdate} routes={Routes} />,
	document.getElementById("container")
);
