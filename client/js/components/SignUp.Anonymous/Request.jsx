var React = require('react');
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var Input = require('../Form/Index.jsx').Input;
var Label = require('../Form/Index.jsx').Label;
var ChurchettoData = require('../../services/ChurchettoData');

var RegisterRequest = React.createClass({
  getInitialState: function() {
    this._state = {
      email: '',
      firstName: '',
      lastName: '',
      firstPassword: '',
      secondPassword: ''
    }
    return this._state;
  },

  render: function() {
    if (this.state.submitting === true) {
      return (
        <div>
          <img src="/img/wait" style={{
            height: "40px",
            paddingRight: "5px"
          }}/> {"Submitting..."}
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
        <Label isRequired={true} label={"First Name"} />
        <Input
          type={"text"}
          placeholder={"John"}
          value={this.state.firstName}
          onChange={this.handleChange_FirstName} />

        <Label isRequired={true} label={"Last Name"} />
        <Input
          type={"text"}
          placeholder={"Calvin"}
          value={this.state.lastName}
          onChange={this.handleChange_LastName} />

        <Label isRequired={true} label={"Your Email"} />
        <Input
          type={"email"}
          placeholder={"jcalvin@protestantism.com"}
          value={this.state.email}
          onChange={this.handleChange_Email} />

        <Label isRequired={true} label={"Password"} />
        <Input
          type={"password"}
          value={this.state.firstPassword}
          onChange={this.handleChange_FirstPassword} />

        <Label isRequired={true} label={"Confirm Password"} />
        <Input
          type={"password"}
          value={this.state.secondPassword}
          onChange={this.handleChange_SecondPassword} />

        <div style={{marginTop: "10px"}}/>
        <ButtonPrimary label={"Create Account"} onClick={this.handleClick_Submit}/>
        {this.getErrorMessage()}
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

  handleChange_FirstPassword: function(event) {
    this._state.firstPassword = event.target.value;
    this.setState(this._state);
  },

  handleChange_SecondPassword: function(event) {
    this._state.secondPassword = event.target.value;
    this.setState(this._state);
  },

  handleClick_Submit: function() {
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

    ChurchettoData.requestUserSetup({
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.secondPassword
    }, function(data) {
      this._state.submitting = false;
      this._state.submitted = true;
      this._state.success = data.success;
      this._state.message = data.message;
      return this.setState(this._state);
    }.bind(this));
  }
});

module.exports = RegisterRequest;
