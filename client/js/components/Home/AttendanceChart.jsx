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
      attendance: [],
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

  componentDidMount: function () {
    $("canvas").css({
      "max-width": "100%",
      "width": "",
      "height": "",
    });
  },

  render: function () {
    return (
      <div id="attendance-chart-container" style={{textAlign:"center"}}>
        <h1 style={{margin:"5px 0"}}>{"Attendance"}</h1>
        <LineChart
          data={this.getChartData()}
          options={this.getChartOptions()}
          width="450"
          height="337.5" />
      </div>
    )
  },

  getChartData: function () {
    var result = {
      labels: [],
      datasets: [{
        label: "Church Attendance",
        fillColor: "#ccc",
        strokeColor: "#666666",
        pointColor: "#f4f4f4",
        pointStrokeColor: "#666666",
        pointHighlightFill: "#f4f4f4",
        pointHighlightStroke: "#3c948b",
        data: []
      }]
    };
    this.state.attendance.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    }).map(function (doc, i) {
      result.labels[i] = moment(doc.date).format("MM/DD/YYYY");
      result.datasets[0].data[i] = doc.count;
    });
    return result;
  },

  getChartOptions: function () {
    return {
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
