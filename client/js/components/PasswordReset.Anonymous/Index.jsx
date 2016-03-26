var React = require('react');
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var PlanManagerService = require('../../services/PlanManagerService');

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var PasswordReset = React.createClass({
    getInitialState: function () {
        this._state = {
            firstPassword: '',
            secondPassword: '',
        }
        return this._state;
    },

    render: function () {
        if (this.state.submitting === true) {
            return (
    			<div style={Style.container}>
    				<div style={Style.login}>
                    	<div style={Style.loginHeader}>
                    		Forgotten Password Reset
                    	</div>
                    	<div style={Style.loginForm}>
        					<img src="/img/wait" style={{height:"40px",paddingRight:"5px"}} />
                            {"Submitting..."}
    					</div>
    				</div>
    			</div>
            )
        }

        if (this.state.submitted === true) {
            return (
    			<div style={Style.container}>
    				<div style={Style.login}>
                    	<div style={Style.loginHeader}>
                    		Forgotten Password Reset
                    	</div>
                    	<div style={Style.loginForm}>
    						{this.getSuccessMessage()}
    						{this.getErrorMessage()}
    					</div>
    				</div>
    			</div>
            )
        }

        return (
			<div style={Style.container}>
				<div style={Style.login}>
                	<div style={Style.loginHeader}>
                		Forgotten Password Reset
                	</div>
                	<div style={Style.loginForm}>
						<label style={Style.formLabel}>New Password</label>
						<input type="password" value={this.state.firstPassword} style={Style.formInput} onChange={this.handleChange_FirstPassword} />
						<label style={Style.formLabel}>Confirm New Password</label>
						<input type="password" value={this.state.secondPassword} style={Style.formInput} onChange={this.handleChange_SecondPassword} name="password" />
                        <div style={{marginTop:"10px"}} />
                        <ButtonPrimary label={"🔒 Submit"} onClick={this.handleClick_Submit} />
						{this.getErrorMessage()}
					</div>
				</div>
			</div>
        )
    },

	getSuccessMessage: function () {
        if (this.state.success === true) {
			return (
				<div style={{paddingTop:"5px"}}>
					{"Success! Your password has been reset! You may now login "}
                    <a href="/login">here</a>.
				</div>
			)
		}
	},

	getErrorMessage: function () {
		if (this.state.success === false) {
			return (
                <div>
    				<div style={{color:"#da383c", paddingTop:"5px"}}>
                        {this.state.message}
    				</div>
                    <div style={{paddingTop:"5px"}}>
                        You can obtain a new password reset link <a href="/forgot">here</a>.
                        Keep in mind that only one link can be sent every 2 hours for security reasons.
                    </div>
                </div>
			)
		}
	},

    handleChange_FirstPassword: function (event) {
        this._state.firstPassword = event.target.value;
        this.setState(this._state);
    },

    handleChange_SecondPassword: function (event) {
        this._state.secondPassword = event.target.value;
        this.setState(this._state);
    },

    handleClick_Submit: function () {
        if (this.state.firstPassword !== this.state.secondPassword) {
            this._state.success = false;
            this._state.message = "The passwords you entered do not match.";
            return this.setState(this._state);
        }

        if (!getParameterByName('token')) {
            this._state.success = false;
            this._state.submitting = false;
            this._state.submitted = true;
            this._state.message = "Password was not changed. Submitted data was invalid.";
            return this.setState(this._state);
        }

        this._state.submitting = true;
        this._state.submitted = false;
        this.setState(this._state);

        PlanManagerService.resetPassword({
            id: this.props.id,
            token: getParameterByName('token'),
            password: this.state.secondPassword,
        }, function (data) {
            if (data.success === false) {
                this._state.success = false;
                this._state.submitting = false;
                this._state.submitted = true;
            	this._state.message = "Password was not changed. Submitted data was invalid.";
                return this.setState(this._state);
            } else {
                this._state.success = true;
                this._state.submitting = false;
                this._state.submitted = true;
                this._state.message = data.message
                    + " You may now login to the application using your new credentials.";
                return this.setState(this._state);
            }
        }.bind(this));
    }
});

module.exports = PasswordReset;
