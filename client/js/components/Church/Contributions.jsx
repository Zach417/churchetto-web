var React = require('react');
var Griddle = require('griddle-react');
var jsonexport = require('jsonexport');
var moment = require('moment');
var browserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;

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
              <ButtonSecondary label={"Export"} onClick={this.handleClick_Export} />
              <span style={{marginRight:"10px"}} />
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
      var amount = "";
      if (this.props.church.contributions[i].amount) {
        amount = this.props.church.contributions[i].amount
          .toString()
          .replace(new RegExp('\\$', 'g'), '')
          .replace(new RegExp(',', 'g'), '');
        amount = "$" + parseFloat(amount)
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
      }
      result.push({
        "contributionId": this.props.church.contributions[i]._id,
        "churchId": this.props.church._id,
        "Date": date,
        "Amount": amount,
        "Member": member,
      });
    }
    return result;
  },

  handleClick_Add: function () {
    browserHistory.push("/church/" + this.props.church._id + "/contribution/create");
  },

  handleClick_Export: function () {
    if (!this.props.church.contributions) { return; }

    var members = this.props.church.members;
    var contributions = [];
    this.props.church.contributions.map(function (contribution) {
      delete contribution._id;
      if (contribution.date) {
        contribution.date = moment(contribution.date).format('MM/DD/YYYY');
      }
      if (contribution.memberId) {
        var memberId = contribution.memberId;
        delete contribution.memberId;
        members.map(function (member) {
          if (memberId == member._id) {
            contribution.member = member.firstName + " " + member.lastName;
          }
        });
      }
      contributions.push(contribution);
    });

    jsonexport(contributions ,function(err, csv){
        if(err) return console.log(err);

        var fileName = "Churchetto - " + this.props.church.name + " Contributions";
        var uri = 'data:text/csv;charset=utf-8,' + escape(csv);
        var link = document.createElement("a");
        link.href = uri;
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }.bind(this));
  },

  handleClick_Row: function (gridRow, event) {
    browserHistory.push("/church/" + gridRow.props.data.churchId + "/contribution/" + gridRow.props.data.contributionId);
  },
});

module.exports = Contribution;
