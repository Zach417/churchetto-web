var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Navigation = require('./Navigation.jsx');
var Info = require('./Info.jsx');
var Contact = require('./Contact.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var ButtonDanger = require('../Button/Index.jsx').Danger;
var ChurchActions = require('../../actions/ChurchActions');

function resolveSubDocuments (campus) {
  if (!campus) { campus = {} }
  if (!campus.phone) { campus.phone = {} }
  if (!campus.fax) { campus.fax = {} }
  if (!campus.address) { campus.address = {} }
  return campus;
}

var Campus = React.createClass({
  getInitialState: function () {
    this.campus = resolveSubDocuments({});
    return {
      campus: this.campus
    }
  },

  componentWillMount: function () {
    this.campus = resolveSubDocuments(this.props.campus);
    this.setState({
      campus: this.campus
    });
  },

  componentDidMount: function() {
    window.scrollTo(0, 0);
  },

  componentWillReceiveProps: function (nextProps) {
    if (!nextProps.campus) {
      return;
    }
    this.campus = resolveSubDocuments(nextProps.campus);
    this.setState({
      campus: this.campus
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
          <Navigation cid={this.props.church._id} mid={this.state.campus._id} />
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
    var result = "New Campus";
    var campus = this.state.campus;
    if (!campus._id && !campus.name) {
      return result;
    }
    return campus.name;
  },

  getChildComponent: function () {
    return React.cloneElement(this.props.children, {
      campus: this.state.campus,
      church: this.props.church,
      onChange: this.handleChange_Child,
    });
  },

  handleChange_Child: function (campus) {
    this.setState({
      campus: this.campus
    });
  },

  handleClick_Submit: function () {
    var church = this.props.church;
    var campuses = [];
    if (this.props.church.campuses) {
      campuses = this.props.church.campuses;
    }
    if (this.campus._id) {
      for (var i = 0; i < campuses.length; i++) {
        if (campuses[i] == this.campus._id) {
          campuses[i] = this.campus;
        }
      }
      church.campuses = campuses;
      ChurchActions.update(church);
    } else {
      campuses.push(this.campus);
      church.campuses = campuses;
      ChurchActions.update(church);
    }
    browserHistory.push("/church/" + this.props.church._id + "/campus");
  },

  handleClick_Cancel: function () {
    browserHistory.push("/church/" + this.props.church._id + "/campus");
  },

  handleClick_Delete: function () {
    if (!this.props.church || !this.props.church.campuses) {
      browserHistory.push("/church/" + this.props.church._id + "/campus");
      return;
    }

    for (var i = 0; i < this.props.church.campuses.length; i++) {
      if (this.props.church.campuses[i]._id == this.state.campus._id) {
        var church = this.props.church;
        church.campuses.splice(i,1);
        ChurchActions.update(church);
        browserHistory.push("/church/" + this.props.church._id + "/campus");
        return;
      }
    }
  },
});

module.exports = Campus;
