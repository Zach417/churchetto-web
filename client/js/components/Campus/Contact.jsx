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
                attribute={"main"}
                value={this.props.campus.phone.main}
                onChange={this.handleChange_AttributePhone} />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <Label isRequired={false} label={"Main Fax"} />
              <Input
                type={"text"}
                attribute={"main"}
                value={this.props.campus.fax.main}
                onChange={this.handleChange_AttributeFax} />
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
                attribute={"line1"}
                value={this.props.campus.address.line1}
                onChange={this.handleChange_AddressAttribute} />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <Label isRequired={false} label={"Address Line 2"} />
              <Input
                type={"text"}
                attribute={"line2"}
                value={this.props.campus.address.line2}
                onChange={this.handleChange_AddressAttribute} />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <Label isRequired={false} label={"City"} />
              <Input
                type={"text"}
                attribute={"city"}
                value={this.props.campus.address.city}
                onChange={this.handleChange_AddressAttribute} />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <Label isRequired={false} label={"State"} />
              <Input
                type={"text"}
                attribute={"state"}
                value={this.props.campus.address.state}
                onChange={this.handleChange_AddressAttribute} />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <Label isRequired={false} label={"Zip Code"} />
              <Input
                type={"text"}
                attribute={"zip"}
                value={this.props.campus.address.zip}
                onChange={this.handleChange_AddressAttribute} />
            </div>
          </div>
        </div>
      </div>
    )
  },

  handleChange_AttributePhone: function (attribute, value) {
    var campus = this.props.campus;
    campus.phone[attribute] = value;
    this.props.onChange(campus);
  },

  handleChange_AttributeFax: function (attribute, value) {
    var campus = this.props.campus;
    campus.fax[attribute] = value;
    this.props.onChange(campus);
  },

  handleChange_AddressAttribute: function (attribute, value) {
    var campus = this.props.campus;
    campus.address[attribute] = value;
    this.props.onChange(campus);
  },
});
module.exports = Info;
