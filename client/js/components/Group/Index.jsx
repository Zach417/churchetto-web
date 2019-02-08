var React = require('react');
var moment = require('moment');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Navigation = require('./Navigation.jsx');
var Info = require('./Info.jsx');
var Members = require('./Members.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var ButtonDanger = require('../Button/Index.jsx').Danger;
var ChurchActions = require('../../actions/ChurchActions');

function resolveSubDocuments (group) {
  if (!group) { group = {} }
  if (!group.members) { group.members = [] }
  return group;
}

var Group = React.createClass({
  getInitialState: function () {
    this.group = resolveSubDocuments({});
    return {
      group: this.group
    }
  },

  componentWillMount: function () {
    this.group = resolveSubDocuments(this.props.group);
    this.setState({
      group: this.group
    });
  },

  componentDidMount: function() {
    window.scrollTo(0, 0);
  },

  componentWillReceiveProps: function (nextProps) {
    if (!nextProps.group) {
      return;
    }
    this.group = resolveSubDocuments(nextProps.group);
    this.setState({
      group: this.group
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
          <Navigation cid={this.props.church._id} mid={this.state.group._id} />
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
    var group = this.state.group;
    if (!group._id && !group.name) {
      return "New Group";
    }
    return group.name;
  },

  getChildComponent: function () {
    return React.cloneElement(this.props.children, {
      group: this.state.group,
      church: this.props.church,
      onChange: this.handleChange_Child,
    });
  },

  handleChange_Child: function (group) {
    this.setState({
      group: this.group
    });
  },

  handleClick_Submit: function () {
    var church = this.props.church;
    var groups = [];
    if (this.props.church.groups) {
      groups = this.props.church.groups;
    }
    if (this.group._id) {
      for (var i = 0; i < groups.length; i++) {
        if (groups[i] == this.group._id) {
          groups[i] = this.group;
        }
      }
      church.groups = groups;
      ChurchActions.update(church);
    } else {
      groups.push(this.group);
      church.groups = groups;
      ChurchActions.update(church);
    }
    browserHistory.push("/church/" + this.props.church._id + "/group");
  },

  handleClick_Cancel: function () {
    browserHistory.push("/church/" + this.props.church._id + "/group");
  },

  handleClick_Delete: function () {
    if (!this.props.church || !this.props.church.groups) {
      browserHistory.push("/church/" + this.props.church._id + "/group");
      return;
    }

    for (var i = 0; i < this.props.church.groups.length; i++) {
      if (this.props.church.groups[i]._id == this.state.group._id) {
        var church = this.props.church;
        church.groups.splice(i,1);
        ChurchActions.update(church);
        browserHistory.push("/church/" + this.props.church._id + "/group");
        return;
      }
    }
  },
});

module.exports = Group;
