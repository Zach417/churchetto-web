var React = require('react');
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var Input = require('../Form/Index.jsx').Input;
var Label = require('../Form/Index.jsx').Label;
var PlanManagerService = require('../../services/ChurchettoData');

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var Register = React.createClass({
  getInitialState: function() {
    this._state = {
      email: '',
      firstName: '',
      lastName: ''
    }
    return this._state;
  },

  render: function() {
    if (this.state.submitting === true) {
      return (
        <div style={Style.container}>
          <div style={Style.login}>
            <div style={Style.loginHeader}>
              Password Reset Request
            </div>
            <div style={Style.loginForm}>
              <img src="/img/wait" style={{
                height: "40px",
                paddingRight: "5px"
              }}/> {"Submitting..."}
            </div>
          </div>
        </div>
      )
    }

    if (this.state.submitted === true) {
      return (
        <div style={Style.container}>
          <div style={Style.login}>
            <div style={Style.header}>
              Password Reset Request
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
          <div style={Style.header}>
            Password Reset Request
          </div>
          <div style={Style.loginForm}>

            <Label isRequired={true} label={"First Name"} />
            <Input
              type={"text"}
              placeholder={"Gordon"}
              value={this.state.firstName}
              onChange={this.handleChange_FirstName} />

            <Label isRequired={true} label={"Last Name"} />
            <Input
              type={"text"}
              placeholder={"Moore"}
              value={this.state.lastName}
              onChange={this.handleChange_LastName} />

            <Label isRequired={true} label={"Email Address"} />
            <Input
              type={"text"}
              placeholder={"gmoore@mooreslaw.com"}
              value={this.state.email}
              onChange={this.handleChange_Email} />

            <div style={{marginTop: "10px"}} />
            <ButtonPrimary label={"Submit"} onClick={this.handleClick_Submit} />
            {this.getErrorMessage()}
          </div>
        </div>
      </div>
    )
  },

  getSuccessMessage: function() {
    if (this.state.success === true) {
      return (
        <div style={{
          paddingTop: "5px"
        }}>
          {this.state.message}
        </div>
      )
    }
  },

  getErrorMessage: function() {
    if (this.state.success === false) {
      return (
        <div style={{
          color: "#da383c",
          paddingTop: "5px"
        }}>
          {this.state.message}
        </div>
      )
    }
  },

  handleChange_Email: function(event) {
    this._state.email = event.target.value;
    this.setState(this._state);
  },

  handleChange_FirstName: function(event) {
    this._state.firstName = event.target.value;
    this.setState(this._state);
  },

  handleChange_LastName: function(event) {
    this._state.lastName = event.target.value;
    this.setState(this._state);
  },

  handleClick_Submit: function() {
    if (!this.state.email || !this.state.firstName || !this.state.lastName) {
      this._state.success = false;
      this._state.message = "One or more required fields were left blank.";
      return this.setState(this._state);
    }

    this._state.submitting = true;
    this._state.submitted = false;
    this.setState(this._state);

    PlanManagerService.requestPasswordReset({
      email: this.state.email
    }, function(data) {
      if (data.success === false) {
        this._state.success = false;
        this._state.submitting = false;
        this._state.submitted = true;
        this._state.message = data.message;
        return this.setState(this._state);
      } else {
        this._state.success = true;
        this._state.submitting = false;
        this._state.submitted = true;
        this._state.message = data.message;
        return this.setState(this._state);
      }
    }.bind(this));
  }
});

module.exports = Register;
