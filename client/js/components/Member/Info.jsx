var React = require('react');
var moment = require('moment');
var Style = require('./Style.jsx');
var Input = require('../Form/Index.jsx').Input;
var Label = require('../Form/Index.jsx').Label;
var TextArea = require('../Form/Index.jsx').TextArea;
var Select = require('../Form/Index.jsx').Select;

var Info = React.createClass({
  componentWillMount: function () {
    this.member = this.props.member;
    if (this.member.dateOfBirth) {
      this.member.dateOfBirth = moment(this.member.dateOfBirth).format("MM/DD/YYYY");
    }
    if (this.member.baptizedOn) {
      this.member.baptizedOn = moment(this.member.baptizedOn).format("MM/DD/YYYY");
    }
  },

  render: function () {
    return (
      <div className="container-fluid" style={Style.sectionContainer}>
        <div className="row-fluid">
          <h3 style={{margin:"0"}}>The Basics</h3>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={true} label={"First Name"} />
            <Input
              type={"text"}
              value={this.member.firstName}
              onChange={this.handleChange_FirstName} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Last Name"} />
            <Input
              type={"text"}
              value={this.member.lastName}
              onChange={this.handleChange_LastName} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Nick Name"} />
            <Input
              type={"text"}
              value={this.member.nickName}
              onChange={this.handleChange_NickName} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Title"} />
            <Select
              type={"text"}
              value={this.member.title}
              options={["Mr.","Mrs.","Ms."]}
              onChange={this.handleChange_Title} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Gender"} />
            <Select
              type={"text"}
              value={this.member.gender}
              options={["Male","Female"]}
              onChange={this.handleChange_Gender} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Member Type"} />
            <Select
              type={"text"}
              value={this.member.type}
              options={["Contributor","Attendee","Other"]}
              onChange={this.handleChange_Type} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Date of Birth"} />
            <Input
              type={"text"}
              value={this.member.dateOfBirth}
              onChange={this.handleChange_DateOfBirth} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Date of Death"} />
            <Input
              type={"text"}
              value={this.member.dateOfDeath}
              onChange={this.handleChange_DateOfDeath} />
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
            style={{marginTop:"20px"}} />
        </div>
        <div className="row-fluid">
          <h3 style={{margin:"0"}}>Work</h3>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Occupation"} />
            <Input
              type={"text"}
              value={this.member.occupation}
              onChange={this.handleChange_Occupation} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Employer"} />
            <Input
              type={"text"}
              value={this.member.employer}
              onChange={this.handleChange_Employer} />
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
            style={{marginTop:"20px"}} />
        </div>
        <div className="row-fluid">
          <h3 style={{margin:"0"}}>Faith</h3>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Baptized On"} />
            <Input
              type={"text"}
              value={this.member.baptizedOn}
              onChange={this.handleChange_BaptizedOn} />
          </div>
        </div>
      </div>
    )
  },

  handleChange_Title: function (event) {
    this.member.title = event.target.value;
    this.props.onChange(this.member);
  },

  handleChange_FirstName: function (event) {
    this.member.firstName = event.target.value;
    this.props.onChange(this.member);
  },

  handleChange_LastName: function (event) {
    this.member.lastName = event.target.value;
    this.props.onChange(this.member);
  },

  handleChange_NickName: function (event) {
    this.member.nickName = event.target.value;
    this.props.onChange(this.member);
  },

  handleChange_Gender: function (event) {
    this.member.gender = event.target.value;
    this.props.onChange(this.member);
  },

  handleChange_Type: function (event) {
    this.member.type = event.target.value;
    this.props.onChange(this.member);
  },

  handleChange_DateOfBirth: function (event) {
    this.member.dateOfBirth = event.target.value;
    this.props.onChange(this.member);
  },

  handleChange_DateOfDeath: function (event) {
    this.member.dateOfDeath = event.target.value;
    this.props.onChange(this.member);
  },

  handleChange_Occupation: function (event) {
    this.member.occupation = event.target.value;
    this.props.onChange(this.member);
  },

  handleChange_Employer: function (event) {
    this.member.employer = event.target.value;
    this.props.onChange(this.member);
  },

  handleChange_BaptizedOn: function (event) {
    this.member.baptizedOn = event.target.value;
    this.props.onChange(this.member);
  },
});
module.exports = Info;
