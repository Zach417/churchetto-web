var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Navigation = require('./Navigation.jsx');
var Button = require('../Button/Index.jsx');
var ChurchActions = require('../../actions/ChurchActions');

function resolveSubDocuments (church) {
  if (!church) { church = {} }
  if (!church.phone) { church.phone = {} }
  if (!church.fax) { church.fax = {} }
  if (!church.address) { church.address = {} }
  if (!church.contributions) { church.contributions = [] }
  if (!church.attendance) { church.attendance = [] }
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
    this.setState({
      church: resolveSubDocuments(this.props.church)
    });
  },

  componentDidMount: function () {
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
          <Button.Primary label={"Save"} onClick={this.handleClick_Submit} />
          <span style={{display:"inline-block",width:"5px"}} />
          <Button.Secondary label={"Cancel"} onClick={this.handleClick_Cancel} />
          <span style={{display:"inline-block",width:"5px"}} />
          <Button.Danger label={"Delete"} onClick={this.handleClick_Delete} />
        </div>
      </div>
    )
  },

  getChildComponent: function () {
    return React.cloneElement(this.props.children, {
      church: this.state.church,
      onChange: this.handleChange_Child,
    });
  },

  handleChange_Child: function (church) {
    this.setState({church:church});
  },

  handleClick_Submit: function () {
    if (this.state.church._id) {
      ChurchActions.update(this.state.church);
      this.setState({church:resolveSubDocuments({})});
      browserHistory.push("/church");
    } else {
      ChurchActions.create(this.state.church);
      this.setState({church:resolveSubDocuments({})});
      browserHistory.push("/");
    }
  },

  handleClick_Cancel: function () {
    browserHistory.push("/church");
  },

  handleClick_Delete: function () {
    var message = "Are you sure you wish to delete this church? "
      + "This is almost certainly a terrible idea, and you most "
      + "likely clicked this by mistake.";
    if (confirm(message)) {
      ChurchActions.destroy(this.state.church);
      this.setState({church:resolveSubDocuments({})});
      browserHistory.push("/");
    }
  },
});

module.exports = Church;
