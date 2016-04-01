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
          return this.setState(this._state);
        }
      }
      this._state = {
        church: this.church,
        member: resolveSubDocuments({}),
      }
      return this.setState(this._state);
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
          <h3 style={{margin:"0"}}>Info</h3>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={true} label={"First Name"} />
            <Input
              type={"text"}
              value={this.state.member.firstName}
              onChange={this.handleChange_FirstName} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Last Name"} />
            <Input
              type={"text"}
              value={this.state.member.lastName}
              onChange={this.handleChange_LastName} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={true} label={"Date of Birth"} />
            <Input
              type={"text"}
              value={this.state.member.dateOfBirth}
              onChange={this.handleChange_DateOfBirth} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={true} label={"Gender"} />
            <Select
              type={"text"}
              value={this.state.member.gender}
              options={["Male","Female"]}
              onChange={this.handleChange_Gender} />
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

  handleChange_FirstName: function (event) {
    this._state.member.firstName = event.target.value;
    this.setState({
      church:this.state.church,
      member:this._state.member,
    });
  },

  handleChange_LastName: function (event) {
    this._state.member.lastName = event.target.value;
    this.setState({
      church:this.state.church,
      member:this._state.member,
    });
  },

  handleChange_DateOfBirth: function (event) {
    this._state.member.dateOfBirth = event.target.value;
    this.setState({
      church:this.state.church,
      member:this._state.member,
    });
  },

  handleChange_Gender: function (event) {
    this._state.member.gender = event.target.value;
    this.setState({
      church:this.state.church,
      member:this._state.member,
    });
  },

  handleClick_Submit: function () {
    var church;
    if (!this.state.member._id) {
      church = this.state.church.members.push(this.state.member);
    } else {
      church = ChurchStore.updateMemberInChurch(this.state.church, this.state.member);
    }

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
