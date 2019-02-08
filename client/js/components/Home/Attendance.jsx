var React = require('react');
var moment = require('moment');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var EntitySubSummary = require('./EntitySubSummary.jsx');
var ChurchStore = require('../../stores/ChurchStore');

var Attendance = React.createClass({
  getInitialState: function () {
    return {
      attendance: '',
    }
  },

  componentWillMount: function () {
    ChurchStore.get(function (docs) {
      if (!docs) {
        return this.setState({
          attendance: []
        });
      }
      var result = [];
      for (var i = 0; i < docs.length; i++) {
        if (!docs[i].attendance) { continue; }
        for (var j = 0; j < docs[i].attendance.length; j++) {
          if (result.length > 5) { continue; }
          var attendance = docs[i].attendance[j];
          attendance.churchId = docs[i]._id;
          result.push(attendance);
        }
      }
      this.setState({
        attendance: result,
      });
    }.bind(this));
  },

  render: function () {
    if (!this.state.attendance) {
      return (
        <div style={Style.entitySummary}>
          <p>Loading...</p>
        </div>
      )
    }

    if (this.state.attendance.length === 0) {
      return (
        <div style={Style.entitySummary}>
          <h1 style={{margin:"5px 0",textAlign:"left"}}>{"Attendance"}</h1>
          <p>{"You don't have any attendance!"}</p>
        </div>
      )
    }

    return (
      <div style={Style.entitySummary}>
        <h1 style={{margin:"5px 0",textAlign:"left"}}>{"Attendance"}</h1>
        {this.getAttendanceComponents()}
      </div>
    )
  },

  getAttendanceComponents: function () {
    return this.state.attendance.sort(function(a,b){
      return new Date(b.date) - new Date(a.date);
    }).map(function (doc, i) {
      var onClick = function () {
        browserHistory.push("/church/" + doc.churchId + "/attendance/" + doc._id);
      }
      var date = "";
      if (doc.date) {
        date = moment(doc.date).format("MM/DD/YYYY");
      }
      return (
        <EntitySubSummary onClick={onClick} key={i}>
          <h3 style={{margin:"5px 0",color:"#c36b74"}}>{date}</h3>
          <p>
            Count: {doc.count}
          </p>
        </EntitySubSummary>
      )
    });
  },
});

module.exports = Attendance;
