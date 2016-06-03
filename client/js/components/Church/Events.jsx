var React = require('react');
var moment = require('moment');
var Griddle = require('griddle-react');
var browserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var Select = require('../Form/Index.jsx').Select;

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
  getInitialState: function () {
    return {
      filter: ''
    }
  },

  render: function () {
    if (!this.props.church) { return (<div/>) }
    return (
      <div className="container-fluid" style={Style.sectionContainer}>
        <div className="row-fluid">
          <div style={{position:"relative"}}>
            <h3 style={{display:"inline-block",margin:"0 0 17px 0"}}>
              <select
                style={{lineHeight:"30px",border:"none",backgroundColor:"#e1e3e4"}}
                onChange={this.handleChange_View}>
                <option value="">All Events</option>
                <option value="Pending">Pending Events</option>
                <option value="Completed">Completed Events</option>
                <option value="Canceled">Canceled Events</option>
              </select>
            </h3>
            <div style={{position:"absolute",top:"-8px",right:"0"}}>
              <ButtonPrimary label={"Add"} onClick={this.handleClick_Add} />
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 hidden-xs"
            style={Style.detailColumn}>
            <Griddle
              results={this.getGriddleData()}
              columnMetadata={columnMeta}
              showFilter={true}
              columns={["Name","Start Time","End Time"]}
              resultsPerPage={20}
              onRowClick={this.handleClick_Row} />
          </div>
          <div className="hidden-lg hidden-md hidden-sm col-xs-12"
            style={Style.detailColumn}>
            <Griddle
              results={this.getGriddleData()}
              columnMetadata={columnMeta}
              showFilter={true}
              columns={["Name","Start Time"]}
              resultsPerPage={10}
              onRowClick={this.handleClick_Row} />
          </div>
        </div>
      </div>
    )
  },

  getGriddleData: function () {
    var events = this.props.church.events;
    var result = [];

    if (this.state.filter) {
      events = this.state.filter(events);
    }

    for (var i = 0; i < events.length; i++) {
      var starts = '';
      if (events[i].starts) {
        starts = moment(events[i].starts).format('MM/DD/YYYY h:mm a')
      }
      var ends = '';
      if (events[i].ends) {
        ends = moment(events[i].ends).format('MM/DD/YYYY h:mm a')
      }
      result.push({
        "eventId": events[i]._id,
        "churchId": this.props.church._id,
        "Name": events[i].name,
        "Start Time": starts,
        "End Time": ends,
      });
    }
    return result;
  },

  handleChange_View: function (event) {
    var filterType = event.target.value;

    if (!filterType) {
      return this.setState({
        filter: ''
      });
    }

    this.setState({
      filter: function (events) {
        return events.filter(function (e) {
          return e.status === filterType;
        });
      },
    });
  },

  handleClick_Add: function () {
    browserHistory.push("/church/" + this.props.church._id + "/event/create");
  },

  handleClick_Row: function (gridRow, event) {
    browserHistory.push("/church/" + gridRow.props.data.churchId + "/event/" + gridRow.props.data.eventId);
  },
});

module.exports = Events;
