var React = require('react');
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var Input = require('../Form/Index.jsx').Input;
var Label = require('../Form/Index.jsx').Label;
var ChurchettoData = require('../../services/ChurchettoData');

var embarrasingEmails = [
  "llama123girl@aol.com",
  "letmypeoplego@prophetsonly.com",
  "Bball4lyfe29@yahoo.com",
  "harpsealpuppylove@aol.com",
  "rollerbladingrl@aol.com",
  "goofygooberchick@gmail.com",
  "teentitan95@yahoo.com",
  "catlover43@hotmail.com",
  "greenday500@sbcglobal.net",
  "cheetahgirl97@mchsi.com",
  "MrBigglesworth28@aol.com"
]

var SignIn = React.createClass({
  getInitialState: function() {
    this._state = {
      email: '',
      password: '',
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

    if (this.state.submitted === true && this.state.success == true) {
      return (
        <div>
          {this.getSuccessMessage()}
          {this.getErrorMessage()}
        </div>
      )
    }

    var randomIndex = Math.floor(Math.random() * (embarrasingEmails.length - 1));

    return (
      <div style={Style.container}>
        <div style={Style.login}>
          <div style={Style.loginHeader}>
            Sign in to Churchetto
          </div>
          <div style={Style.loginForm}>

            <Label isRequired={true} label={"Email address"} />
            <Input
              type={"text"}
              placeholder={embarrasingEmails[randomIndex]}
              value={this.state.email}
              onChange={this.handleChange_Email} />

            <Label isRequired={true} label={"Password"} />
            <Input
              type={"password"}
              value={this.state.password}
              onChange={this.handleChange_Password} />

            <div style={{marginTop: "10px"}} />
            <ButtonPrimary label={"Sign In"} onClick={this.handleClick_Submit} />
            {this.getErrorMessage()}

          </div>
        </div>
      </div>
    )
  },

  getSuccessMessage: function() {
    if (this.state.success == true) {
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
    if (this.state.success == false) {
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

  handleChange_Email: function (event) {
    this._state.email = event.target.value;
    this.setState(this._state);
  },

  handleChange_Password: function (event) {
    this._state.password = event.target.value;
    this.setState(this._state);
  },

  handleClick_Submit: function() {
    if (!this.state.email || !this.state.password) {
      this._state.success = false;
      this._state.message = "One or more required fields were left blank.";
      return this.setState(this._state);
    }

    this._state.submitting = true;
    this._state.submitted = false;
    this.setState(this._state);

    ChurchettoData.signIn({
      email: this.state.email,
      password: this.state.password
    }, function(data) {
      this._state.submitting = false;
      this._state.submitted = true;
      this._state.success = data.success;
      this._state.message = data.message;

      if (data.success == true) {
        return window.location.assign('/');
      }

      return this.setState(this._state);
    }.bind(this));
  }
});

module.exports = SignIn;
