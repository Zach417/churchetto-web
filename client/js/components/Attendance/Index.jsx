var React = require('react');
var moment = require('moment');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Info = require('./Info.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var ButtonDanger = require('../Button/Index.jsx').Danger;
var Input = require('../Form/Index.jsx').Input;
var Label = require('../Form/Index.jsx').Label;
var TextArea = require('../Form/Index.jsx').TextArea;
var Select = require('../Form/Index.jsx').Select;
var ChurchActions = require('../../actions/ChurchActions');

function resolveSubDocuments (attendance) {
  if (!attendance) { attendance = {} }
  return attendance;
}

var Member = React.createClass({
  getInitialState: function () {
    this.attendance = resolveSubDocuments({});
    return {
      attendance: this.attendance
    }
  },

  componentWillMount: function () {
    this.attendance = resolveSubDocuments(this.props.attendance);

    if (this.attendance.date && moment(this.attendance.date).isValid()) {
      this.attendance.date = moment(this.attendance.date).format("MM/DD/YYYY");
    }

    this.setState({
      attendance: this.attendance
    });
  },

  componentDidMount: function() {
    window.scrollTo(0, 0);
  },

  componentWillReceiveProps: function (nextProps) {
    if (!nextProps.attendance) {
      return;
    }
    this.attendance = resolveSubDocuments(nextProps.attendance);

    if (nextProps.attendance.date && moment(nextProps.attendance.date).isValid()) {
      this.attendance.date = moment(nextProps.attendance.date).format("MM/DD/YYYY");
    }

    this.setState({
      attendance: this.attendance
    });
  },

  render: function () {
    return (
      <div style={Style.componentContainerNoPadding}>
        <div style={{padding:"0 20px 0 20px"}}>
          <h1 style={{wordBreak:"break-word"}}>
            Attendance
          </h1>
        </div>
        <div style={{padding:"0 20px 20px 20px"}}>
          <Info
            attendance={this.state.attendance}
            church={this.props.church}
            onChange={this.handleChange_Child} />
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

  handleChange_Child: function (attendance) {
    this.attendance = attendance;
    this.setState({
      attendance: this.attendance
    });
  },

  handleClick_Submit: function () {
    var church = this.props.church;
    var attendance = [];
    if (this.props.church.attendance) {
      attendance = this.props.church.attendance;
    }
    if (this.attendance._id) {
      for (var i = 0; i < attendance.length; i++) {
        if (attendance[i] == this.attendance._id) {
          attendance[i] = this.attendance;
        }
      }
      church.attendance = attendance;
      ChurchActions.update(church);
    } else {
      attendance.push(this.attendance);
      church.attendance = attendance;
      ChurchActions.update(church);
    }
    browserHistory.push("/church/" + this.props.church._id + "/attendance");
  },

  handleClick_Cancel: function () {
    browserHistory.push("/church/" + this.props.church._id + "/attendance");
  },

  handleClick_Delete: function () {
    if (!this.props.church || !this.props.church.attendance) {
      browserHistory.push("/church/" + this.props.church._id + "/attendance");
      return;
    }

    for (var i = 0; i < this.props.church.attendance.length; i++) {
      if (this.props.church.attendance[i]._id == this.state.attendance._id) {
        var church = this.props.church;
        church.attendance.splice(i,1);
        ChurchActions.update(church);
        browserHistory.push("/church/" + this.props.church._id + "/attendance");
        return;
      }
    }
  },
});

module.exports = Member;
