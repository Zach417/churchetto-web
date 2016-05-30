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
                attribute={"email"}
                value={this.props.member.email}
                onChange={this.handleChange_Attribute} />
            </div>
          </div>
          <div className="row-fluid">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <Label isRequired={false} label={"Main Phone"} />
              <Input
                type={"text"}
                attribute={"main"}
                value={this.props.member.phone.main}
                onChange={this.handleChange_AttributePhone} />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <Label isRequired={false} label={"Cell Phone"} />
              <Input
                type={"text"}
                attribute={"cell"}
                value={this.props.member.phone.cell}
                onChange={this.handleChange_AttributePhone} />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <Label isRequired={false} label={"Business Phone"} />
              <Input
                type={"text"}
                attribute={"business"}
                value={this.props.member.phone.business}
                onChange={this.handleChange_AttributePhone} />
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
                attribute={"line1"}
                value={this.props.member.address.line1}
                onChange={this.handleChange_AttributeAddress} />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <Label isRequired={false} label={"Address Line 2"} />
              <Input
                type={"text"}
                attribute={"line2"}
                value={this.props.member.address.line2}
                onChange={this.handleChange_AttributeAddress} />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <Label isRequired={false} label={"City"} />
              <Input
                type={"text"}
                attribute={"city"}
                value={this.props.member.address.city}
                onChange={this.handleChange_AttributeAddress} />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <Label isRequired={false} label={"State"} />
              <Input
                type={"text"}
                attribute={"state"}
                value={this.props.member.address.state}
                onChange={this.handleChange_AttributeAddress} />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <Label isRequired={false} label={"Zip Code"} />
              <Input
                type={"text"}
                attribute={"zip"}
                value={this.props.member.address.zip}
                onChange={this.handleChange_AttributeAddress} />
            </div>
          </div>
        </div>
      </div>
    )
  },

  handleChange_Attribute: function (attribute, value) {
    var member = this.props.member;
    member[attribute] = value;
    this.props.onChange(member);
  },

  handleChange_AttributePhone: function (attribute, value) {
    var member = this.props.member;
    member.phone[attribute] = value;
    this.props.onChange(member);
  },

  handleChange_AttributeAddress: function (attribute, value) {
    var member = this.props.member;
    member.address[attribute] = value;
    this.props.onChange(member);
  },
});
module.exports = Info;
