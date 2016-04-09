var React = require('react');
var browserHistory = require('react-router').browserHistory;
var $ = require('jquery');

var Style = require('./Style.jsx');
var Church = require('./Church.jsx');
var Event = require('./Event.jsx');
var Campuses = require('./Campuses.jsx');
var Attendance = require('./Attendance.jsx');
var AttendanceChart = require('./AttendanceChart.jsx');
var ContributionChart = require('./ContributionChart.jsx');
var Group = require('./Group.jsx');
var Member = require('./Member.jsx');

var HomePage = React.createClass({
  componentDidMount: function() {
    window.scrollTo(0, 0);
  },

  render: function() {
    return (
      <div style={Style.headerPadding} className="container-fluid">
        <div className="row-fluid">
          <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
            <AttendanceChart />
            <div style={{marginTop:"20px"}} />
            <ContributionChart />
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
            <Church />
            <div style={{marginTop:"20px"}} />
            <Member />
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
            <div style={{marginTop:"20px"}} className="hidden-lg hidden-sm" />
            <Event />
            <div style={{marginTop:"20px"}} />
            <Group />
            <div style={{marginTop:"20px"}} />
            <Campuses />
          <div />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = HomePage;
