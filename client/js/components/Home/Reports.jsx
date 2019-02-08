var React = require('react');
var moment = require('moment');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var ReportsData = require('../ReportViewer/Reports.jsx');
var EntitySubSummary = require('./EntitySubSummary.jsx');

var Reports = React.createClass({
  getInitialState: function () {
    return {
      reports: ReportsData,
    }
  },

  render: function () {
    if (!this.state.reports) {
      return (
        <div style={Style.entitySummary}>
          <p>Loading...</p>
        </div>
      )
    }

    if (this.state.reports.length === 0) {
      return (
        <div style={Style.entitySummary}>
          <h1 style={{margin:"5px 0",textAlign:"left"}}>{"Reports"}</h1>
          <p>{"There aren't any reports to run!"}</p>
        </div>
      )
    }

    return (
      <div style={Style.entitySummary}>
        <h1 style={{margin:"5px 0",textAlign:"left"}}>{"Reports"}</h1>
        {this.getReportComponents()}
      </div>
    )
  },

  getReportComponents: function () {
    return this.state.reports.map(function (report, i) {
      var onClick = function () {
        browserHistory.push("/report-viewer/" + report.path);
      }
      return (
        <EntitySubSummary onClick={onClick} key={i}>
          <h3 style={{margin:"5px 0",color:"#c36b74"}}>
            {report.label}
          </h3>
        </EntitySubSummary>
      )
    });
  }
});

module.exports = Reports;
