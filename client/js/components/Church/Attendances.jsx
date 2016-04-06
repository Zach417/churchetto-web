var React = require('react');
var moment = require('moment');
var Griddle = require('griddle-react');
var browserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;

var LinkComponent = React.createClass({
  render: function(){
    var url ="/church/" + this.props.rowData.churchId + "/attendance/" + this.props.rowData.attendanceId;
    return <Link to={url}>{this.props.data}</Link>
  },
});

var columnMeta = [
  {
    "columnName": "attendanceId",
    "locked": true,
    "visible": false,
  }, {
    "columnName": "churchId",
    "locked": true,
    "visible": false,
  }, {
    "columnName": "Date",
    "order": 1,
    "locked": false,
    "visible": true,
  }, {
    "columnName": "Count",
    "order": 2,
    "locked": false,
    "visible": true,
  }
];

var Attendance = React.createClass({
  render: function () {
    if (!this.props.church) { return (<div/>) }
    return (
      <div className="container-fluid" style={Style.sectionContainer}>
        <div className="row-fluid">
          <div style={{position:"relative"}}>
            <h3 style={{display:"inline-block",margin:"0 0 17px 0"}}>Attendance</h3>
            <div style={{position:"absolute",top:"-8px",right:"0"}}>
              <ButtonPrimary label={"Add"} onClick={this.handleClick_Add} />
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Griddle results={this.getGriddleData()} columnMetadata={columnMeta}
              columns={["Date","Count"]} resultsPerPage={20}
              onRowClick={this.handleClick_Row} />
          </div>
        </div>
      </div>
    )
  },

  getGriddleData: function () {
    var result = [];
    for (var i = 0; i < this.props.church.attendance.length; i++) {
      var date = "";
      if (this.props.church.attendance[i].date) {
        date = moment(this.props.church.attendance[i].date).format("MM/DD/YYYY");
      }
      result.push({
        "attendanceId": this.props.church.attendance[i]._id,
        "churchId": this.props.church._id,
        "Date": date,
        "Count": this.props.church.attendance[i].count,
      });
    }
    return result;
  },

  handleClick_Add: function () {
    browserHistory.push("/church/" + this.props.church._id + "/attendance/create");
  },

  handleClick_Row: function (gridRow, event) {
    browserHistory.push("/church/" + gridRow.props.data.churchId + "/attendance/" + gridRow.props.data.attendanceId);
  },
});

module.exports = Attendance;
