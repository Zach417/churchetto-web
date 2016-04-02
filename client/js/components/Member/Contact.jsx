var React = require('react');
var Style = require('./Style.jsx');
var Input = require('../Form/Index.jsx').Input;
var Label = require('../Form/Index.jsx').Label;
var TextArea = require('../Form/Index.jsx').TextArea;
var Select = require('../Form/Index.jsx').Select;

var Info = React.createClass({
  componentWillMount: function () {
    this.member = this.props.member;
  },

  render: function () {
    return (
      <div className="container-fluid" style={Style.sectionContainer}>
        <div className="row-fluid">
          <h3 style={{margin:"0"}}>Phone & Email</h3>
          <div className="row-fluid">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <Label isRequired={false} label={"Email"} />
              <Input
                type={"text"}
                value={this.props.member.email}
                onChange={this.handleChange_Email} />
            </div>
          </div>
          <div className="row-fluid">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <Label isRequired={false} label={"Main Phone"} />
              <Input
                type={"text"}
                value={this.props.member.phone.main}
                onChange={this.handleChange_PhoneMain} />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <Label isRequired={false} label={"Cell Phone"} />
              <Input
                type={"text"}
                value={this.props.member.phone.cell}
                onChange={this.handleChange_PhoneCell} />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <Label isRequired={false} label={"Business Phone"} />
              <Input
                type={"text"}
                value={this.props.member.phone.business}
                onChange={this.handleChange_PhoneBusiness} />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
              style={{marginTop:"20px"}} />
          </div>
          <div className="row-fluid">
            <h3 style={{margin:"0"}}>Address</h3>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <Label isRequired={false} label={"Address Line 1"} />
              <Input
                type={"text"}
                value={this.props.member.address.line1}
                onChange={this.handleChange_AddressLine1} />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <Label isRequired={false} label={"Address Line 2"} />
              <Input
                type={"text"}
                value={this.props.member.address.line2}
                onChange={this.handleChange_AddressLine2} />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <Label isRequired={false} label={"City"} />
              <Input
                type={"text"}
                value={this.props.member.address.city}
                onChange={this.handleChange_AddressCity} />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <Label isRequired={false} label={"State"} />
              <Input
                type={"text"}
                value={this.props.member.address.state}
                onChange={this.handleChange_AddressState} />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <Label isRequired={false} label={"Zip Code"} />
              <Input
                type={"text"}
                value={this.props.member.address.zip}
                onChange={this.handleChange_AddressZip} />
            </div>
          </div>
        </div>
      </div>
    )
  },

  handleChange_Email: function (event) {
    this.member.email = event.target.value;
    this.props.onChange(this.member);
  },

  handleChange_PhoneMain: function (event) {
    this.member.phone.main = event.target.value;
    this.props.onChange(this.member);
  },

  handleChange_PhoneCell: function (event) {
    this.member.phone.cell = event.target.value;
    this.props.onChange(this.member);
  },

  handleChange_PhoneBusiness: function (event) {
    this.member.phone.business = event.target.value;
    this.props.onChange(this.member);
  },

  handleChange_AddressLine1: function (event) {
    this.member.address.line1 = event.target.value;
    this.props.onChange(this.member);
  },

  handleChange_AddressLine2: function (event) {
    this.member.address.line2 = event.target.value;
    this.props.onChange(this.member);
  },

  handleChange_AddressCity: function (event) {
    this.member.address.city = event.target.value;
    this.props.onChange(this.member);
  },

  handleChange_AddressState: function (event) {
    this.member.address.state = event.target.value;
    this.props.onChange(this.member);
  },

  handleChange_AddressZip: function (event) {
    this.member.address.zip = event.target.value;
    this.props.onChange(this.member);
  },
});
module.exports = Info;
