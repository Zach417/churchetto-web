var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var ButtonSecondaryLarge = require('../Button/Index.jsx').Secondary.Large;

var Church = React.createClass({
  render: function () {
    if (!this.props.id) {
      return (
        <div className="container-fluid" style={Style.navigationContainer}>
          <div className="row-fluid">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{padding:"0"}}>
              <ButtonSecondaryLarge label={"Info"} onClick={this.handleClick_Info} />
            </div>
        </div>
      </div>
      )
    }
    return (
      <div className="container-fluid" style={Style.navigationContainer}>
        <div className="row-fluid">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{padding:"0"}}>
            <ButtonSecondaryLarge label={"Info"} onClick={this.handleClick_Info} />
            <ButtonSecondaryLarge label={"Attendance"} onClick={this.handleClick_Attendance} />
            <ButtonSecondaryLarge label={"Members"} onClick={this.handleClick_Members} />
            <ButtonSecondaryLarge label={"Groups"} onClick={this.handleClick_Groups} />
            <ButtonSecondaryLarge label={"Events"} onClick={this.handleClick_Events} />
            <ButtonSecondaryLarge label={"Campuses"} onClick={this.handleClick_Campuses} />
          </div>
      </div>
    </div>
    )
  },

  handleClick_Info: function () {
    if (this.props.id) {
      browserHistory.push("/church/" + this.props.id + "/info");
    } else {
      browserHistory.push("/church/create/info");
    }
  },

  handleClick_Attendance: function () {
    if (this.props.id) {
      browserHistory.push("/church/" + this.props.id + "/attendance");
    } else {
      browserHistory.push("/church/create/attendance");
    }
  },

  handleClick_Members: function () {
    if (this.props.id) {
      browserHistory.push("/church/" + this.props.id + "/member");
    } else {
      browserHistory.push("/church/create/member");
    }
  },

  handleClick_Groups: function () {
    if (this.props.id) {
      browserHistory.push("/church/" + this.props.id + "/group");
    } else {
      browserHistory.push("/church/create/group");
    }
  },

  handleClick_Events: function () {
    if (this.props.id) {
      browserHistory.push("/church/" + this.props.id + "/event");
    } else {
      browserHistory.push("/church/create/event");
    }
  },

  handleClick_Campuses: function () {
    if (this.props.id) {
      browserHistory.push("/church/" + this.props.id + "/campus");
    } else {
      browserHistory.push("/church/create/campus");
    }
  },
});

module.exports = Church;
