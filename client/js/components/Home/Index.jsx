var React = require('react');
var browserHistory = require('react-router').browserHistory;
var $ = require('jquery');

var Style = require('./Style.jsx');
var Church = require('./Church.jsx');
var Event = require('./Event.jsx');
var Campuses = require('./Campuses.jsx');
var Attendance = require('./Attendance.jsx');
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
          <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered"
            style={{padding:"0"}}>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Church />
              <div style={{marginTop:"20px"}} />
              <Campuses />
              <div style={{marginTop:"20px"}} />
              <Member />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div style={{marginTop:"20px"}} className="hidden-lg hidden-md" />
              <Attendance />
              <div style={{marginTop:"20px"}} />
              <Event />
              <div style={{marginTop:"20px"}} />
              <Group />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = HomePage;
