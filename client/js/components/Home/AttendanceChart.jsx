var React = require('react');
var moment = require('moment');
var $ = require('jquery');
var LineChart = require('react-chartjs').Line;
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var EntitySubSummary = require('./EntitySubSummary.jsx');
var ChurchStore = require('../../stores/ChurchStore');

var Attendance = React.createClass({
  getInitialState: function () {
    return {
      churches: [],
    }
  },

  componentWillMount: function () {
    // update to add support for multiple organizations
    // on chart (i.e. different lines on graph)
    ChurchStore.get(function (docs) {
      if (!docs) {
        return this.setState({
          churches: []
        });
      }
      this.setState({
        churches: docs,
      });
    }.bind(this));
  },

  render: function () {
    if (!this.state.churches || this.state.churches.length === 0) {
      return (
        <div id="attendance-chart-container" style={{textAlign:"center"}}>
          <h1 style={{margin:"5px 0"}}>{"Average Attendance"}</h1>
        </div>
      )
    }
    return (
      <div id="attendance-chart-container" style={{textAlign:"center"}}>
        <h1 style={{margin:"5px 0"}}>{"Average Attendance"}</h1>
        <LineChart
          id="attendance-chart"
          data={this.getChartData("month")}
          options={this.getChartOptions()}
          width="450"
          height="337.5" />
      </div>
    )
  },

  getChartData: function (group) {
    var result = {
      labels: [],
      datasets: []
    };

    var format = "MMMM YY";
    if (group == "year") {
      format = "YYYY";
    }

    // set labels
    this.state.churches.map(function (church, i) {
      church.attendance.map(function (attendance, j) {
        var exists = false;
        for (var k = 0; k < result.labels.length; k++) {
          if (result.labels[k] === moment(attendance.date).format(format)) {
            exists = true;
          }
        }
        if (!exists) {
          result.labels.push(moment(attendance.date).format(format));
        }
      });
    });

    result.labels = result.labels.sort(function (a, b) {
      return new Date(a) - new Date(b);
    });

    var datasets = [];
    datasets[0] = {
      fillColor: "rgba(204,204,204,0.2)",
      strokeColor: "#666666",
      pointColor: "#f4f4f4",
      pointStrokeColor: "#666666",
      pointHighlightFill: "#f4f4f4",
      pointHighlightStroke: "#3c948b",
      data: []
    }
    datasets[1] = {
      fillColor: "rgba(230,230,230,0.2)",
      strokeColor: "#666666",
      pointColor: "#f4f4f4",
      pointStrokeColor: "#666666",
      pointHighlightFill: "#f4f4f4",
      pointHighlightStroke: "#3c948b",
      data: []
    }

    this.state.churches.map(function (church, i) {
      var label = "Church " + i;
      if (church.name) {
        label = church.name;
      }
      if (!datasets[i]) {
        result.datasets[i] = datasets[0];
        result.datasets[i].label = label;
      } else {
        result.datasets[i] = datasets[i];
        result.datasets[i].label = label;
      }
      var runningTotals = {};
      var runningCounts = {};
      church.attendance.map(function (attendance, j) {
        result.labels.map(function (label, k) {
          if (!result.datasets[i].data[k]) {
            if (label === moment(attendance.date).format(format)) {
              result.datasets[i].data[k] = attendance.count;
              runningTotals[label] = attendance.count;
              runningCounts[label] = 1;
            } else {
              result.datasets[i].data[k] = null;
            }
          } else {
            if (label === moment(attendance.date).format(format)) {
              runningTotals[label] = runningTotals[label] + attendance.count;
              runningCounts[label]++;
              result.datasets[i].data[k] = (runningTotals[label] / runningCounts[label]);
            }
          }
        });
      });
    });

    return result;
  },

  getChartOptions: function () {
    return {
      responsive: true,
      scaleShowGridLines : true,
      scaleGridLineColor : "rgba(0,0,0,.05)",
      scaleGridLineWidth : 1,
      scaleShowHorizontalLines: true,
      scaleShowVerticalLines: true,
      bezierCurve : true,
      bezierCurveTension : 0.4,
      pointDot : true,
      pointDotRadius : 4,
      pointDotStrokeWidth : 1,
      pointHitDetectionRadius : 20,
      datasetStroke : true,
      datasetStrokeWidth : 2,
      datasetFill : true,
      legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    };
  },
});

module.exports = Attendance;
