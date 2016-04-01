var React = require('react');
var Style = require('./Style.jsx');
var Input = require('../Form/Index.jsx').Input;
var Label = require('../Form/Index.jsx').Label;
var TextArea = require('../Form/Index.jsx').TextArea;
var Select = require('../Form/Index.jsx').Select;
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var ChurchStore = require('../../stores/ChurchStore');
var ChurchActions = require('../../actions/ChurchActions');

function resolveSubDocuments (member) {
  if (!member.phone) { member.phone = {} }
  if (!member.address) { member.address = {} }
  return member;
}

function resolveChurchSubDocuments (church) {
  if (!church.phone) { church.phone = {} }
  if (!church.fax) { church.fax = {} }
  if (!church.address) { church.address = {} }
  if (!church.members) { church.members = [] }
  if (!church.campuses) { church.campuses = [] }
  return church;
}

var Info = React.createClass({
  getInitialState: function () {
    this._state = {
      church: resolveChurchSubDocuments({}),
      member: resolveSubDocuments({}),
    }
    return this._state;
  },

  componentWillMount: function () {
    ChurchStore.getOne(this.props.params.id, function (doc) {
      this.church = resolveChurchSubDocuments(doc);
      for (var i = 0; i < this.church.members.length; i++) {
        if (this.church.members[i]._id == this.props.params.mid) {
          this._state = {
            church: this.church,
            member: resolveSubDocuments(this.church.members[i]),
          }
          this.setState(this._state);
        }
      }
    }.bind(this))
  },

  componentWillUnmount: function () {
    for (var i = 0; i < this.church.members.length; i++) {
      if (this.church.members[i]._id == this.props.params.mid) {
        this.church.members[i] = this.state.member;
        this._state = {
          church: this.church,
          member: this.state.member,
        }
        this.setState(this._state);
      }
    }
    ChurchActions.update(this.state.church);
  },

  render: function () {
    return (
      <div className="container-fluid" style={Style.sectionContainer}>
        <div className="row-fluid">
          <h3 style={{margin:"0"}}>Contact</h3>
          <div className="row-fluid">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <Label isRequired={true} label={"Email"} />
              <Input
                type={"text"}
                value={this.state.member.email}
                onChange={this.handleChange_Email} />
            </div>
          </div>
          <div className="row-fluid">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <Label isRequired={true} label={"Main Phone"} />
              <Input
                type={"text"}
                value={this.state.member.phone.main}
                onChange={this.handleChange_PhoneMain} />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <Label isRequired={true} label={"Cell Phone"} />
              <Input
                type={"text"}
                value={this.state.member.phone.cell}
                onChange={this.handleChange_PhoneCell} />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <Label isRequired={true} label={"Business Phone"} />
              <Input
                type={"text"}
                value={this.state.member.phone.business}
                onChange={this.handleChange_PhoneBusiness} />
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
                value={this.state.member.address.line1}
                onChange={this.handleChange_AddressLine1} />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <Label isRequired={false} label={"Address Line 2"} />
              <Input
                type={"text"}
                value={this.state.member.address.line2}
                onChange={this.handleChange_AddressLine2} />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <Label isRequired={false} label={"City"} />
              <Input
                type={"text"}
                value={this.state.member.address.city}
                onChange={this.handleChange_AddressCity} />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <Label isRequired={false} label={"State"} />
              <Input
                type={"text"}
                value={this.state.member.address.state}
                onChange={this.handleChange_AddressState} />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <Label isRequired={false} label={"Zip Code"} />
              <Input
                type={"text"}
                value={this.state.member.address.zip}
                onChange={this.handleChange_AddressZip} />
            </div>
          </div>
        </div>
        <div className="row-fluid">
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <ButtonPrimary label={"Save"} onClick={this.handleClick_Submit} />
            <span style={{display:"inline-block",width:"5px"}} />
            <ButtonSecondary label={"Cancel"} onClick={this.handleClick_Cancel} />
          </div>
        </div>
      </div>
    )
  },

  handleChange_Email: function (event) {
    this.member.email = event.target.value;
    this.props.handleChange(this.member);
  },

  handleChange_PhoneMain: function (event) {
    this.member.phone.main = event.target.value;
    this.props.handleChange(this.member);
  },

  handleChange_PhoneCell: function (event) {
    this.member.phone.cell = event.target.value;
    this.props.handleChange(this.member);
  },

  handleChange_PhoneBusiness: function (event) {
    this.member.phone.business = event.target.value;
    this.props.handleChange(this.member);
  },

  handleChange_AddressLine1: function (event) {
    this.member.address.line1 = event.target.value;
    this.props.handleChange(this.member);
  },

  handleChange_AddressLine2: function (event) {
    this.member.address.line2 = event.target.value;
    this.props.handleChange(this.member);
  },

  handleChange_AddressCity: function (event) {
    this.member.address.city = event.target.value;
    this.props.handleChange(this.member);
  },

  handleChange_AddressState: function (event) {
    this.member.address.state = event.target.value;
    this.props.handleChange(this.member);
  },

  handleChange_AddressZip: function (event) {
    this.member.address.zip = event.target.value;
    this.props.handleChange(this.member);
  },

  handleClick_Submit: function () {
    var church = ChurchStore.updateMemberInChurch(this.state.church, this.state.member);
    this.setState({
      church: church,
      member: this.state.member,
    })
    ChurchActions.update(this.state.church);
  },

  handleClick_Cancel: function () {
  },
});
module.exports = Info;
