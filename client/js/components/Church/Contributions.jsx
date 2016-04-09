var React = require('react');
var moment = require('moment');
var Griddle = require('griddle-react');
var browserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;

var LinkComponent = React.createClass({
  render: function(){
    var url ="/church/" + this.props.rowData.churchId + "/contribution/" + this.props.rowData.contributionId;
    return <Link to={url}>{this.props.data}</Link>
  },
});

var columnMeta = [
  {
    "columnName": "contributionId",
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
    "columnName": "Amount",
    "order": 2,
    "locked": false,
    "visible": true,
  }, {
    "columnName": "Member",
    "order": 3,
    "locked": false,
    "visible": true,
  }
];

var Contribution = React.createClass({
  render: function () {
    if (!this.props.church) { return (<div/>) }
    return (
      <div className="container-fluid" style={Style.sectionContainer}>
        <div className="row-fluid">
          <div style={{position:"relative"}}>
            <h3 style={{display:"inline-block",margin:"0px 0px 17px 0px"}}>Contributions</h3>
            <div style={{position:"absolute",top:"-8px",right:"0px"}}>
              <ButtonPrimary label={"Add"} onClick={this.handleClick_Add} />
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Griddle results={this.getGriddleData()} columnMetadata={columnMeta}
              columns={["Member","Date","Amount"]} resultsPerPage={20}
              onRowClick={this.handleClick_Row} />
          </div>
        </div>
      </div>
    )
  },

  getGriddleData: function () {
    var result = [];
    for (var i = 0; i < this.props.church.contributions.length; i++) {
      var date = "";
      if (this.props.church.contributions[i].date) {
        date = moment(this.props.church.contributions[i].date).format("MM/DD/YYYY");
      }
      var member = "";
      this.props.church.members.map(function (doc, j) {
        if (doc && doc._id == this.props.church.contributions[i].memberId) {
          member = doc.firstName + " " + doc.lastName;
        }
      }.bind(this));
      result.push({
        "contributionId": this.props.church.contributions[i]._id,
        "churchId": this.props.church._id,
        "Date": date,
        "Amount": this.props.church.contributions[i].amount,
        "Member": member,
      });
    }
    return result;
  },

  handleClick_Add: function () {
    browserHistory.push("/church/" + this.props.church._id + "/contribution/create");
  },

  handleClick_Row: function (gridRow, event) {
    browserHistory.push("/church/" + gridRow.props.data.churchId + "/contribution/" + gridRow.props.data.contributionId);
  },
});

module.exports = Contribution;
