var React = require('react');
var moment = require('moment');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Navigation = require('./Navigation.jsx');
var Info = require('./Info.jsx');
var Contact = require('./Contact.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var ButtonDanger = require('../Button/Index.jsx').Danger;
var ChurchActions = require('../../actions/ChurchActions');

function resolveSubDocuments (member) {
  if (!member) { member = {} }
  if (!member.phone) { member.phone = {} }
  if (!member.address) { member.address = {} }
  return member;
}

var Member = React.createClass({
  getInitialState: function () {
    this.member = resolveSubDocuments({});
    return {
      member: this.member
    }
  },

  componentWillMount: function () {
    this.member = resolveSubDocuments(this.props.member);

    if (this.member.dateOfBirth && moment(this.member.dateOfBirth).isValid()) {
      this.member.dateOfBirth = moment(this.member.dateOfBirth).startOf("day").format("MM/DD/YYYY");
    }

    if (this.member.dateOfDeath && moment(this.member.dateOfDeath).isValid()) {
      this.member.dateOfDeath = moment(this.member.dateOfDeath).startOf("day").format("MM/DD/YYYY");
    }

    if (this.member.baptizedOn && moment(this.member.baptizedOn).isValid()) {
      this.member.baptizedOn = moment(this.member.baptizedOn).startOf("day").format("MM/DD/YYYY");
    }

    this.setState({
      member: this.member
    });
  },

  componentDidMount: function() {
    window.scrollTo(0, 0);
  },

  componentWillReceiveProps: function (nextProps) {
    if (!nextProps.member) {
      return;
    }
    this.member = resolveSubDocuments(nextProps.member);

    if (nextProps.member.dateOfBirth && moment(nextProps.member.dateOfBirth).isValid()) {
      this.member.dateOfBirth = moment(nextProps.member.dateOfBirth).format("MM/DD/YYYY");
    }

    if (this.member.dateOfDeath && moment(this.member.dateOfDeath).isValid()) {
      this.member.dateOfDeath = moment(this.member.dateOfDeath).startOf("day").format("MM/DD/YYYY");
    }

    if (nextProps.member.baptizedOn && moment(nextProps.member.baptizedOn).isValid()) {
      this.member.baptizedOn = moment(nextProps.member.baptizedOn).format("MM/DD/YYYY");
    }

    this.setState({
      member: this.member
    });
  },

  render: function () {
    return (
      <div style={Style.componentContainerNoPadding}>
        <div style={{padding:"0 20px 0 20px"}}>
          <h1 style={{wordBreak:"break-word"}}>
            {this.getHeading()}
          </h1>
        </div>
        <div style={{margin:"0 0 20px 0",backgroundColor: "#666666"}}>
          <Navigation cid={this.props.church._id} mid={this.state.member._id} />
        </div>
        <div style={{padding:"0 20px 20px 20px"}}>
          {this.getChildComponent()}
        </div>
        <div style={{padding:"0 20px 20px 20px"}}>
          <ButtonPrimary label={"Save"} onClick={this.handleClick_Submit} />
          <span style={{display:"inline-block",width:"5px"}} />
          <ButtonSecondary label={"Cancel"} onClick={this.handleClick_Cancel} />
          <span style={{display:"inline-block",width:"5px"}} />
          <ButtonDanger label={"Delete"} onClick={this.handleClick_Delete} />
        </div>
      </div>
    )
  },

  getHeading: function () {
    var result = "New Member";
    var member = this.state.member;
    if (!member._id && !member.firstName && !member.lastName) {
      return result;
    }
    if (member.firstName && member.lastName) {
      result = member.firstName + " " + member.lastName;
    } else if (member.firstName || member.lastName) {
      if (member.firstName) {
        result = member.firstName;
      }
      if (member.lastName) {
        result = member.lastName;
      }
    } else {
      result = "he who shall not be named";
    }
    return result;
  },

  getChildComponent: function () {
    return React.cloneElement(this.props.children, {
      member: this.state.member,
      church: this.props.church,
      onChange: this.handleChange_Child,
    });
  },

  handleChange_Child: function (member) {
    this.setState({
      member: member
    });
  },

  handleClick_Submit: function () {
    var church = this.props.church;
    var members = [];
    if (this.props.church.members) {
      members = this.props.church.members;
    }
    if (this.member._id) {
      for (var i = 0; i < members.length; i++) {
        if (members[i] == this.member._id) {
          members[i] = this.member;
        }
      }
      church.members = members;
      ChurchActions.update(church);
    } else {
      members.push(this.member);
      church.members = members;
      ChurchActions.update(church);
    }
    browserHistory.push("/church/" + this.props.church._id + "/member");
  },

  handleClick_Cancel: function () {
    browserHistory.push("/church/" + this.props.church._id + "/member");
  },

  handleClick_Delete: function () {
    if (!this.props.church || !this.props.church.members) {
      browserHistory.push("/church/" + this.props.church._id + "/member");
      return;
    }

    for (var i = 0; i < this.props.church.members.length; i++) {
      if (this.props.church.members[i]._id == this.state.member._id) {
        var church = this.props.church;
        church.members.splice(i,1);
        ChurchActions.update(church);
        browserHistory.push("/church/" + this.props.church._id + "/member");
        return;
      }
    }
  },
});

module.exports = Member;
