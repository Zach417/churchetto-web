var React = require('react');
var Style = require('./Style.jsx');

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var Login = React.createClass({
	getInitialState: function () {
		return {
			submitButtonStyle: ''
		}
	},

	componentWillMount: function () {
		this.setState({
			submitButtonStyle: Style.loginFormSubmit
		});
	},

	render: function () {
		return (
			<div style={Style.container}>
				<div style={Style.login}>
                	<div style={Style.loginHeader}>
                		Sign in to PlanManager
                	</div>
                	<div style={Style.loginForm}>
						<form action="/login" method="post">
							<label style={Style.formLabel}>Email address</label>
							<input type="text" name="email" style={Style.formInput} />
							<label style={Style.formLabel}>Password</label>
							<input type="password" name="password" style={Style.formInput} />
							<input type="submit" value="🔒 Sign In" style={this.state.submitButtonStyle}
								onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} className="btn btn-default" />
						</form>
						{this.getErrorMessage()}
					</div>
				</div>
				<div style={Style.register}>
                	<div style={Style.registerLink}>
                		New to PlanManager?<br/>
                		<a href="/register">Create an account.</a>
                	</div>
				</div>
				<div style={Style.register}>
                	<div style={Style.registerLink}>
                		Forgot your password?<br/>
                		<a href="/forgot">Reset it.</a>
                	</div>
				</div>
			</div>
		)
	},

	getErrorMessage: function () {
		if (getParameterByName("success") == "false") {
			return (
				<div style={{color:"#da383c", paddingTop:"5px"}}>
					An error occurred while trying to log in. Please
					verify that your email and password are correct.
				</div>
			)
		}
	},

	handleMouseOver: function () {
		this.setState({
			submitButtonStyle: Style.loginFormSubmitHover
		});
	},

	handleMouseOut: function () {
		this.setState({
			submitButtonStyle: Style.loginFormSubmit
		});
	}
});

module.exports = Login;
