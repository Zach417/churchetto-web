var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Navigation = require('./Navigation.jsx');
var Button = require('../Button/Index.jsx');
var ChurchActions = require('../../actions/ChurchActions');
var Input = require('../Form/Index.jsx').Input;

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
      church: resolveSubDocuments({}),
      attemptDelete: false,
      deleteMsg: '',
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
          <h1 style={{wordBreak:"break-word"}}>
            {this.getHeading()}
          </h1>
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
          <Button.Danger label={"Delete"} onClick={this.handleClick_AttemptDelete} />
        </div>
        {this.getDeleteSection()}
      </div>
    )
  },

  getDeleteSection: function () {
    var deleteMsg = 'DELETE ' + this.state.church.name;
    if (this.state.attemptDelete) {
      if (this.state.deleteMsg === deleteMsg) {
        return (
          <div style={{padding:"0 20px 20px 20px"}}>
            <div className="container-fluid" style={Style.sectionContainer}>
              <div className="row-fluid">
                <p>
                  Are you sure you wish to delete your church data?
                  This is probably a bad idea!
                </p>
                <ul>
                  <li>All of your data will be gone forever</li>
                  <li>You will never get it back</li>
                </ul>
                <p>
                   If you understand, then type the following text (case sensitive) into the input box below and click the delete button after it appears:
                </p>
                <p>
                  <i>{deleteMsg}</i>
                </p>
                <Input
                  attribute={"deleteMsg"}
                  value={this.state.deleteMsg}
                  onChange={this.handleChange_Attribute} />
                <div style={{paddingBottom:"10px"}} />
                <Button.Danger label={"DELETE CHURCH DATA FOREVER"} onClick={this.handleClick_Delete} />
              </div>
            </div>
          </div>
        )
      }

      return (
        <div style={{padding:"0 20px 20px 20px"}}>
          <div className="container-fluid" style={Style.sectionContainer}>
            <div className="row-fluid">
              <p>
                Are you sure you wish to delete your church data?
                This is probably a bad idea!
              </p>
              <ul>
                <li>All of your data will be gone forever</li>
                <li>You will never get it back</li>
              </ul>
              <p>
                 If you understand, then type the following text (case sensitive) into the input box below and click the delete button after it appears:
              </p>
              <p>
                <i>{deleteMsg}</i>
              </p>
              <Input
                attribute={"deleteMsg"}
                value={this.state.deleteMsg}
                onChange={this.handleChange_Attribute} />
            </div>
          </div>
        </div>
      )
    }
  },

  handleChange_Attribute: function (attribute, value) {
    var state = this.state;
    state[attribute] = value;
    this.setState(state);
  },

  getHeading: function () {
    var result = this.state.church.name;
    if (this.props.children) {
      result += " | " + this.props.children.type.displayName;
    }
    return result;
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

  handleClick_AttemptDelete: function () {
    var state = this.state;
    state.attemptDelete = true;
    this.setState(state);
  },

  handleClick_Delete: function () {
    if (this.state.attemptDelete == true && this.state.deleteMsg == 'DELETE ' + this.state.church.name) {
      ChurchActions.destroy(this.state.church);
      this.setState({church:resolveSubDocuments({})});
      browserHistory.push("/");
    }
  },
});

module.exports = Church;
