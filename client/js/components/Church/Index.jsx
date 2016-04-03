var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Navigation = require('./Navigation.jsx');
var Info = require('./Info.jsx');
var Contact = require('./Contact.jsx');
var Members = require('./Members.jsx');
var Campuses = require('./Campuses.jsx');
var Groups = require('./Groups.jsx');
var Events = require('./Events.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var ButtonDanger = require('../Button/Index.jsx').Danger;
var ChurchActions = require('../../actions/ChurchActions');

function resolveSubDocuments (church) {
  if (!church.phone) { church.phone = {} }
  if (!church.fax) { church.fax = {} }
  if (!church.address) { church.address = {} }
  if (!church.members) { church.members = [] }
  if (!church.campuses) { church.campuses = [] }
  if (!church.events) { church.events = [] }
  if (!church.groups) { church.groups = [] }
  return church;
}

var Church = React.createClass({
  getInitialState: function () {
    return {
      church: resolveSubDocuments({})
    }
  },

  componentWillMount: function () {
    if (!this.props.church) {
      return this.setState({
        church: resolveSubDocuments({})
      });
    }

    this.setState({
      church: resolveSubDocuments(this.props.church)
    });
  },

  componentDidMount: function() {
    window.scrollTo(0, 0);
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.church) {
      this.setState({
        church: resolveSubDocuments(nextProps.church)
      });
    }
  },

  render: function () {
    return (
      <div style={Style.componentContainerNoPadding}>
        <div style={{padding:"0 20px 0 20px"}}>
          <h1 style={{wordBreak:"break-word"}}>{this.state.church.name}</h1>
        </div>
        <div style={{margin:"0 0 20px 0",backgroundColor: "#666666"}}>
          <Navigation id={this.state.church._id} />
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

  getChildComponent: function () {
    var path = window.location.pathname;
    var basePath = "/church/" + this.state.church._id;
    if (!this.state.church._id) {
      basePath = "/church/create";
    }
    if (path === basePath) {
      return (
        <Info church={this.state.church} onChange={this.handleChange_Child} />
      )
    } else if (path === basePath + "/info") {
      return (
        <Info church={this.state.church} onChange={this.handleChange_Child} />
      )
    } else if (path === basePath + "/contact") {
      return (
        <Contact church={this.state.church} onChange={this.handleChange_Child} />
      )
    } else if (path === basePath + "/member") {
      return (
        <Members church={this.state.church} onChange={this.handleChange_Child} />
      )
    } else if (path === basePath + "/campus") {
      return (
        <Campuses church={this.state.church} onChange={this.handleChange_Child} />
      )
    } else if (path === basePath + "/event") {
      return (
        <Events church={this.state.church} onChange={this.handleChange_Child} />
      )
    } else if (path === basePath + "/group") {
      return (
        <Groups church={this.state.church} onChange={this.handleChange_Child} />
      )
    } else {
      return this.props.children;
    }
  },

  handleChange_Child: function (church) {
    this.setState({church:church});
  },

  handleClick_Submit: function () {
    if (this.state.church._id) {
      ChurchActions.update(this.state.church);
    } else {
      ChurchActions.create(this.state.church);
    }
    browserHistory.push("/church");
  },

  handleClick_Cancel: function () {
    browserHistory.push("/church");
  },

  handleClick_Delete: function () {
    ChurchActions.destroy(this.state.church);
    browserHistory.push("/church");
  },
});

module.exports = Church;
