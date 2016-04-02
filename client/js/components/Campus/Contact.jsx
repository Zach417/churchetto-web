var React = require('react');
var Style = require('./Style.jsx');
var Input = require('../Form/Index.jsx').Input;
var Label = require('../Form/Index.jsx').Label;
var TextArea = require('../Form/Index.jsx').TextArea;
var Select = require('../Form/Index.jsx').Select;

var Info = React.createClass({
  componentWillMount: function () {
    this.campus = this.props.campus;
  },

  render: function () {
    return (
      <div className="container-fluid" style={Style.sectionContainer}>
        <div className="row-fluid">
          <h3 style={{margin:"0"}}>Contact</h3>
          <div className="row-fluid">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <Label isRequired={false} label={"Main Phone"} />
              <Input
                type={"text"}
                value={this.props.campus.phone.main}
                onChange={this.handleChange_PhoneMain} />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <Label isRequired={false} label={"Main Fax"} />
              <Input
                type={"text"}
                value={this.props.campus.fax.main}
                onChange={this.handleChange_FaxMain} />
            </div>
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
                value={this.props.campus.address.line1}
                onChange={this.handleChange_AddressLine1} />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <Label isRequired={false} label={"Address Line 2"} />
              <Input
                type={"text"}
                value={this.props.campus.address.line2}
                onChange={this.handleChange_AddressLine2} />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <Label isRequired={false} label={"City"} />
              <Input
                type={"text"}
                value={this.props.campus.address.city}
                onChange={this.handleChange_AddressCity} />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <Label isRequired={false} label={"State"} />
              <Input
                type={"text"}
                value={this.props.campus.address.state}
                onChange={this.handleChange_AddressState} />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <Label isRequired={false} label={"Zip Code"} />
              <Input
                type={"text"}
                value={this.props.campus.address.zip}
                onChange={this.handleChange_AddressZip} />
            </div>
          </div>
        </div>
      </div>
    )
  },

  handleChange_PhoneMain: function (event) {
    this.campus.phone.main = event.target.value;
    this.props.onChange(this.campus);
  },

  handleChange_FaxMain: function (event) {
    this.campus.fax.main = event.target.value;
    this.props.onChange(this.campus);
  },

  handleChange_AddressLine1: function (event) {
    this.campus.address.line1 = event.target.value;
    this.props.onChange(this.campus);
  },

  handleChange_AddressLine2: function (event) {
    this.campus.address.line2 = event.target.value;
    this.props.onChange(this.campus);
  },

  handleChange_AddressCity: function (event) {
    this.campus.address.city = event.target.value;
    this.props.onChange(this.campus);
  },

  handleChange_AddressState: function (event) {
    this.campus.address.state = event.target.value;
    this.props.onChange(this.campus);
  },

  handleChange_AddressZip: function (event) {
    this.campus.address.zip = event.target.value;
    this.props.onChange(this.campus);
  },
});
module.exports = Info;
