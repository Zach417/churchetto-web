var React = require('react');
var Style = require('./Style.jsx');
var Input = require('../Form/Index.jsx').Input;
var Label = require('../Form/Index.jsx').Label;
var TextArea = require('../Form/Index.jsx').TextArea;

var Info = React.createClass({
  componentWillMount: function () {
    this.member = this.props.member;
  },

  render: function () {
    return (
      <div className="container-fluid" style={Style.sectionContainer}>
        <div className="row-fluid">
          <h3 style={{margin:"0"}}>Info</h3>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={true} label={"First Name"} />
            <Input
              type={"text"}
              value={this.props.member.firstName}
              onChange={this.handleChange_FirstName} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Last Name"} />
            <Input
              type={"text"}
              value={this.props.member.lastName}
              onChange={this.handleChange_LastName} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={true} label={"Date of Birth"} />
            <Input
              type={"text"}
              value={this.props.member.dateOfBirth}
              onChange={this.handleChange_DateOfBirth} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={true} label={"Gender"} />
            <Input
              type={"text"}
              value={this.props.member.gender}
              onChange={this.handleChange_Gender} />
          </div>
        </div>
      </div>
    )
  },

  handleChange_FirstName: function (event) {
    this.member.firstName = event.target.value;
    this.props.handleChange(this.member);
  },

  handleChange_LastName: function (event) {
    this.member.lastName = event.target.value;
    this.props.handleChange(this.member);
  },

  handleChange_DateOfBirth: function (event) {
    this.member.dateOfBirth = event.target.value;
    this.props.handleChange(this.member);
  },

  handleChange_Gender: function (event) {
    this.member.gender = event.target.value;
    this.props.handleChange(this.member);
  },
});
module.exports = Info;
