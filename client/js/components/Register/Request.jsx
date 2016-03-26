var React = require('react');
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var PlanManagerService = require('../../services/PlanManagerService');

var RegisterRequest = React.createClass({
	getInitialState: function () {
		this._state = {
			email: '',
			firstName: '',
			lastName: '',
			firstPassword: '',
			secondPassword: '',
		}
		return this._state;
	},

    render: function () {
        if (this.state.submitting === true) {
            return (
            	<div>
					<img src="/img/wait" style={{height:"40px",paddingRight:"5px"}} />
                    {"Submitting..."}
				</div>
            )
        }

        if (this.state.submitted === true && this.state.success === true) {
            return (
				<div>
					{this.getSuccessMessage()}
					{this.getErrorMessage()}
				</div>
            )
        }

        return (
            <div>
                <div style={Style.header}>
                    Create an account
                </div>

                <label style={Style.formLabel}>
                    <span style={{color:"#da383c"}}>* </span>
                    <span>First Name</span>
                </label>
                <input style={Style.formInput} value={this.state.firstName} type="text" placeholder="John" onChange={this.handleChange_FirstName} />

                <label style={Style.formLabel}>
                    <span style={{color:"#da383c"}}>* </span>
                    <span>Last Name</span>
                </label>
                <input style={Style.formInput} value={this.state.lastName} type="text" placeholder="Doe" onChange={this.handleChange_LastName} />

                <label style={Style.formLabel}>
                    <span style={{color:"#da383c"}}>* </span>
                    <span>Your Email</span>
                </label>
                <input style={Style.formInput} value={this.state.email} type="email" placeholder="jdoe@example.com" onChange={this.handleChange_Email} />

                <label style={Style.formLabel}>
                    <span style={{color:"#da383c"}}>* </span>
                    <span>Password</span>
                </label>
                <input style={Style.formInput} value={this.state.firstPassword} type="password" onChange={this.handleChange_FirstPassword} />

                <label style={Style.formLabel}>
                    <span style={{color:"#da383c"}}>* </span>
                    <span>Confirm Password</span>
                </label>
                <input style={Style.formInput} value={this.state.secondPassword} type="password" onChange={this.handleChange_SecondPassword} />

                <div style={{marginTop:"10px"}} />
                <ButtonPrimary label={"🔒 Create Account"} onClick={this.handleClick_Submit} />
                {this.getErrorMessage()}
            </div>
        )
    },

	getSuccessMessage: function () {
        if (this.state.success === true) {
			return (
				<div style={{paddingTop:"5px"}}>
                    {this.state.message}
				</div>
			)
		}
	},

	getErrorMessage: function () {
		if (this.state.success === false) {
			return (
				<div style={{color:"#da383c", paddingTop:"5px"}}>
                    {this.state.message}
				</div>
			)
		}
	},

	handleChange_Email: function (event) {
		this._state.email = event.target.value;
		this.setState(this._state);
	},

	handleChange_FirstName: function (event) {
		this._state.firstName = event.target.value;
		this.setState(this._state);
	},

	handleChange_LastName: function (event) {
		this._state.lastName = event.target.value;
		this.setState(this._state);
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
        if (!this.state.email || !this.state.firstName || !this.state.lastName || !this.state.secondPassword) {
            this._state.success = false;
            this._state.message = "One or more required fields were left blank.";
            return this.setState(this._state);
        }

        if (this.state.firstPassword !== this.state.secondPassword) {
            this._state.success = false;
            this._state.message = "The passwords you entered do not match.";
            return this.setState(this._state);
        }

        this._state.submitting = true;
        this._state.submitted = false;
        this.setState(this._state);

        PlanManagerService.requestUserSetup({
            email: this.state.email,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			password: this.state.secondPassword,
        }, function (data) {
			this._state.submitting = false;
			this._state.submitted = true;
			this._state.success = data.success;
			this._state.message = data.message;
            return this.setState(this._state);
        }.bind(this));
	},
});

module.exports = RegisterRequest;
