var React = require('react');
var moment = require('moment');
var $ = require('jquery');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Label = require('../Form/Index.jsx').Label;
var Input = require('../Form/Index.jsx').Input;
var Button = require('../Button/Index.jsx');

var cardStyle = {
  base: {
    fontSize: '16px',
    lineHeight: '24px'
  }
};

var TipJar = React.createClass({
  getInitialState: function () {
    return {
      isLoading: false,
      success: false,
      amount: 0,
      card: elements.create('card', {style: cardStyle}),
      paymentToken: '',
      error: '',
    }
  },

  componentDidMount: function () {
    this.state.card.mount('#card-element');
    this.state.card.addEventListener('change', this.handleChange_CardElement);
  },

  componentWillUnmount: function () {
    this.state.card.removeEventListener('change', this.handleChange_CardElement);
    this.state.card.clear();
    this.state.card.destroy();
  },

  render: function () {
    return (
      <div style={Style.entitySummary}>
        <h1 style={{margin:"5px 0",textAlign:"left"}}>{"Tip Jar 🍯"}</h1>
        <p>
          Churchetto is 100% free for churches of all sizes. Help support server costs, user support, and future development by contributing a voluntary tip.
        </p>
        {this.getBody()}
        {this.getButton()}
        <div role="alert" style={{lineHeight:"35px"}}>
          {this.state.error}
        </div>
      </div>
    )
  },

  getBody: function () {
    if (this.state.success == false) {
      return (
        <div>
          <div>
            <div style={{float:"left"}}>
              <Label isRequired={false} label={"Tip Amount ($, USD)"} />
            </div>
            <img src="/img/powered-by-stripe" style={{float:"right",marginTop:"15px"}} />
          </div>
          <Input
            value={this.state.amount}
            onChange={this.handleChange_TipAmount} />
          <div key={"stripe-card-element"} id="card-element" style={{margin:"10px 0px",backgroundColor:"#fff",padding:"15px",border:"1px solid #eee"}}></div>
        </div>
      )
    }
  },

  getButton: function () {
    if (this.state.isLoading) {
      return (
        <p>
          Processing...
        </p>
      )
    }

    if (this.state.success) {
      return (
        <p style={{borderTop:"1px solid #ccc", paddingTop:"15px"}}>
          Tip placed! Thank you for your donation and contribution to the Churchetto project!
        </p>
      )
    }

    return (
      <div style={{marginTop:"10px"}}>
        <Button.Primary label={"Submit"} onClick={this.handleClick_Submit} />
      </div>
    )
  },

  handleChange_CardElement: function (event) {
    var state = this.state;

    if (event.error) {
      state.error = event.error.message;
    } else {
      state.error = "";
    }

    this.setState(state);
  },

  handleChange_TipAmount: function (value) {
    var state = this.state;
    state.amount = value;
    this.setState(state);
  },

  handleClick_Submit: function () {
    var state = this.state;
    state.isLoading = true;
    state.error = '';
    this.setState(state);

    stripe.createToken(this.state.card).then(function(result) {
      if (result.error) {
        var state = this.state;
        state.isLoading = false;
        state.error = result.error.message;
        this.setState(state);
      } else {
        var state = this.state;
        state.paymentToken = result.token;
        this.setState(state);
      }
    }.bind(this)).catch(function (error) {
      var state = this.state;
      state.isLoading = false;
      state.error = error;
      this.setState(state);
    }.bind(this)).finally(function () {
      this.postRequest();
    }.bind(this));
  },

  postRequest: function () {
    $.ajax({
      type: "POST",
      url: "/tip",
      data: {
        amount: this.state.amount,
        paymentToken: this.state.paymentToken,
      },
      success: function (result) {
        if (result.success == true) {
          var state = this.state;
          state.isLoading = false;
          state.error = '';
          state.success = true;
          this.setState(state);
        } else {
          var state = this.state;
          state.isLoading = false;
          state.error = result.message;
          this.setState(state);
        }
      }.bind(this),
      error: function (xhr, ajaxOptions, thrownError) {
        var state = this.state;
        state.isLoading = false;
        state.error = "An ajax error occured: " + thrownError;
        this.setState(state);
      }.bind(this),
      dataType: "json"
    });
  }
});

module.exports = TipJar;
