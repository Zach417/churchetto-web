var React = require('react');
var moment = require('moment');
var Style = require('./Style.jsx');
var MemberImage = require('./Image.jsx');
var Input = require('../Form/Index.jsx').Input;
var Label = require('../Form/Index.jsx').Label;
var TextArea = require('../Form/Index.jsx').TextArea;
var Select = require('../Form/Index.jsx').Select;
var ImageService = require('../../services/ImageService');

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var Info = React.createClass({
  render: function () {
    return (
      <div className="container-fluid" style={Style.sectionContainer}>
        <div className="row-fluid">
          <MemberImage
            path={this.props.member.imagePath}
            onUpload={this.handleUpload_ImagePath} />
          <div className="col-xs-12" style={{marginTop:"20px"}} />
          <h3 style={{margin:"0"}}>The Basics</h3>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={true} label={"First Name"} />
            <Input
              type={"text"}
              attribute={"firstName"}
              value={this.props.member.firstName}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Last Name"} />
            <Input
              type={"text"}
              attribute={"lastName"}
              value={this.props.member.lastName}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Nick Name"} />
            <Input
              type={"text"}
              attribute={"nickName"}
              value={this.props.member.nickName}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Title"} />
            <Select
              type={"text"}
              attribute={"title"}
              value={this.props.member.title}
              options={["Mr.","Mrs.","Ms."]}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Marital Status"} />
            <Select
              type={"text"}
              attribute={"maritalStatus"}
              value={this.props.member.maritalStatus}
              options={["Married","Single","Divorced","Widow","Widower"]}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Gender"} />
            <Select
              type={"text"}
              attribute={"gender"}
              value={this.props.member.gender}
              options={["Male","Female"]}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Member Date"} />
            <Input
              type={"text"}
              attribute={"dateOfMembership"}
              value={this.props.member.dateOfMembership}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Member Type"} />
            <Select
              type={"text"}
              attribute={"type"}
              value={this.props.member.type}
              options={["Member","Contributor","Attendee","Other"]}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Anniversary Date"} />
            <Input
              type={"text"}
              attribute={"dateOfAnniversary"}
              value={this.props.member.dateOfAnniversary}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Date of Birth"} />
            <Input
              type={"text"}
              attribute={"dateOfBirth"}
              value={this.props.member.dateOfBirth}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Date of Death"} />
            <Input
              type={"text"}
              attribute={"dateOfDeath"}
              value={this.props.member.dateOfDeath}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Envelope Number"} />
            <Input
              type={"text"}
              attribute={"envelopeNumber"}
              value={this.props.member.envelopeNumber}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Notes"} />
            <TextArea
              type={"text"}
              attribute={"notes"}
              value={this.props.member.notes}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-xs-12" style={{marginTop:"20px"}} />
        </div>
        <div className="row-fluid">
          <h3 style={{margin:"0"}}>Work</h3>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Occupation"} />
            <Input
              type={"text"}
              attribute={"occupation"}
              value={this.props.member.occupation}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Employer"} />
            <Input
              type={"text"}
              attribute={"employer"}
              value={this.props.member.employer}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-xs-12" style={{marginTop:"20px"}} />
        </div>
        <div className="row-fluid">
          <h3 style={{margin:"0"}}>Family</h3>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Family Unit"} />
            <Input
              type={"text"}
              attribute={"family"}
              placeholder={this.getFamilyPlaceholder()}
              value={this.props.member.family}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Relationship"} />
            <Select
              type={"text"}
              attribute={"familyRelationship"}
              value={this.props.member.familyRelationship}
              options={["Husband","Wife","Child","Guardian","Other"]}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-xs-12" style={{marginTop:"20px"}} />
        </div>
        <div className="row-fluid">
          <h3 style={{margin:"0"}}>Faith</h3>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Baptized On"} />
            <Input
              type={"text"}
              attribute={"baptizedOn"}
              value={this.props.member.baptizedOn}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Faith Confirmed On"} />
            <Input
              type={"text"}
              attribute={"dateOfFaithConfirmation"}
              value={this.props.member.dateOfFaithConfirmation}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Faith Reaffirmed On"} />
            <Input
              type={"text"}
              attribute={"dateOfFaithReaffirmation"}
              value={this.props.member.dateOfFaithReaffirmation}
              onChange={this.handleChange_Attribute} />
          </div>
        </div>
      </div>
    )
  },

  getFamilyPlaceholder: function () {
    if (this.props.member.lastName) {
      return "The " + this.props.member.lastName + " Family";
    } else {
      return "The Johnson Family";
    }
  },

  handleChange_Attribute: function (attribute, value) {
    var member = this.props.member;
    member[attribute] = value;
    this.props.onChange(member);
  },

  handleUpload_ImagePath: function (imagePath) {
    var member = this.props.member;
    member.imagePath = imagePath;
    this.props.onChange(member);
  },
});

module.exports = Info;
