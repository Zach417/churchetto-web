var React = require('react');
var moment = require('moment');
var Griddle = require('griddle-react');
var browserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;

var LinkComponent = React.createClass({
  render: function () {
    var url ="/church/" + this.props.rowData.churchId + "/event/" + this.props.rowData.eventId;
    return <Link to={url}>{this.props.data}</Link>
  },
});

var columnMeta = [
  {
    "columnName": "eventId",
    "locked": true,
    "visible": false,
  }, {
    "columnName": "churchId",
    "locked": true,
    "visible": false,
  }, {
    "columnName": "Name",
    "order": 1,
    "locked": false,
    "visible": true,
    "customComponent": LinkComponent
  }, {
    "columnName": "Start Time",
    "order": 2,
    "locked": false,
    "visible": true,
  }, {
    "columnName": "End Time",
    "order": 3,
    "locked": false,
    "visible": true,
  }
];

var Events = React.createClass({
  render: function () {
    if (!this.props.church) { return (<div/>) }
    return (
      <div className="container-fluid" style={Style.sectionContainer}>
        <div className="row-fluid">
          <div style={{position:"relative"}}>
            <h3 style={{display:"inline-block",margin:"0 0 17px 0"}}>Events</h3>
            <div style={{position:"absolute",top:"-8px",right:"0"}}>
              <ButtonPrimary label={"Add"} onClick={this.handleClick_Add} />
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 hidden-xs"
            style={Style.detailColumn}>
            <Griddle results={this.getGriddleData()} columnMetadata={columnMeta}
              columns={["Name","Start Time","End Time"]} resultsPerPage={20}
              onRowClick={this.handleClick_Row} />
          </div>
          <div className="hidden-lg hidden-md hidden-sm col-xs-12"
            style={Style.detailColumn}>
            <Griddle results={this.getGriddleData()} columnMetadata={columnMeta}
              columns={["Name","Start Time"]} resultsPerPage={10}
              onRowClick={this.handleClick_Row} />
          </div>
        </div>
      </div>
    )
  },

  getGriddleData: function () {
    var result = [];
    for (var i = 0; i < this.props.church.events.length; i++) {
      var starts = '';
      if (this.props.church.events[i].starts) {
        starts = moment(this.props.church.events[i].starts).format('MM/DD/YYYY h:mm a')
      }
      var ends = '';
      if (this.props.church.events[i].ends) {
        ends = moment(this.props.church.events[i].ends).format('MM/DD/YYYY h:mm a')
      }
      result.push({
        "eventId": this.props.church.events[i]._id,
        "churchId": this.props.church._id,
        "Name": this.props.church.events[i].name,
        "Start Time": starts,
        "End Time": ends,
      });
    }
    return result;
  },

  handleClick_Add: function () {
    browserHistory.push("/church/" + this.props.church._id + "/event/create");
  },

  handleClick_Row: function (gridRow, event) {
    browserHistory.push("/church/" + gridRow.props.data.churchId + "/event/" + gridRow.props.data.eventId);
  },
});

module.exports = Events;
