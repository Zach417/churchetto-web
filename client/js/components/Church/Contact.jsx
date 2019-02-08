var React = require('react');
var Style = require('./Style.jsx');
var Input = require('../Form/Index.jsx').Input;
var Label = require('../Form/Index.jsx').Label;
var TextArea = require('../Form/Index.jsx').TextArea;

var Contact = React.createClass({
  componentWillMount: function () {
    this.church = this.props.church;
  },

  render: function () {
    if (!this.props.church) { return (<div/>) }
    return (
      <div className="container-fluid" style={Style.sectionContainer}>
        <div className="row-fluid">
          <h3 style={{margin:"0"}}>Contact</h3>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Main Phone"} />
            <Input
              type={"text"}
              value={this.props.church.phone.main}
              onChange={this.handleChange_PhoneMain} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Main Fax"} />
            <Input
              type={"text"}
              value={this.props.church.fax.main}
              onChange={this.handleChange_FaxMain} />
          </div>
        </div>
        <div className="row-fluid">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
            style={{marginTop:"20px"}} />
        </div>
        <div className="row-fluid">
          <h3 style={{margin:"0"}}>Main Address</h3>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Address Line 1"} />
            <Input
              type={"text"}
              value={this.props.church.address.line1}
              onChange={this.handleChange_AddressLine1} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Address Line 2"} />
            <Input
              type={"text"}
              value={this.props.church.address.line2}
              onChange={this.handleChange_AddressLine2} />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"City"} />
            <Input
              type={"text"}
              value={this.props.church.address.city}
              onChange={this.handleChange_AddressCity} />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"State"} />
            <Input
              type={"text"}
              value={this.props.church.address.state}
              onChange={this.handleChange_AddressState} />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Zip Code"} />
            <Input
              type={"text"}
              value={this.props.church.address.zip}
              onChange={this.handleChange_AddressZip} />
          </div>
        </div>
      </div>
    )
  },

  handleChange_PhoneMain: function (event) {
    this.church.phone.main = event.target.value;
    this.props.onChange(this.church);
  },

  handleChange_FaxMain: function (event) {
    this.church.fax.main = event.target.value;
    this.props.onChange(this.church);
  },

  handleChange_AddressLine1: function (event) {
    this.church.address.line1 = event.target.value;
    this.props.onChange(this.church);
  },

  handleChange_AddressLine2: function (event) {
    this.church.address.line2 = event.target.value;
    this.props.onChange(this.church);
  },

  handleChange_AddressCity: function (event) {
    this.church.address.city = event.target.value;
    this.props.onChange(this.church);
  },

  handleChange_AddressState: function (event) {
    this.church.address.state = event.target.value;
    this.props.onChange(this.church);
  },

  handleChange_AddressZip: function (event) {
    this.church.address.zip = event.target.value;
    this.props.onChange(this.church);
  },
});

module.exports = Contact;
