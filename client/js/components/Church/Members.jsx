var React = require('react');
var Griddle = require('griddle-react');
var browserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ChurchStore = require('../../stores/ChurchStore');

function resolveSubDocuments (church) {
  if (!church.phone) { church.phone = {} }
  if (!church.fax) { church.fax = {} }
  if (!church.address) { church.address = {} }
  if (!church.members) { church.members = [] }
  if (!church.campuses) { church.campuses = [] }
  return church;
}

var LinkComponent = React.createClass({
  render: function(){
    var url ="/church/" + this.props.rowData.churchId + "/member/" + this.props.rowData.memberId;
    return <Link to={url}>{this.props.data}</Link>
  },
});

var columnMeta = [
  {
    "columnName": "memberId",
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
    "columnName": "Phone",
    "order": 2,
    "locked": false,
    "visible": true,
  }, {
    "columnName": "Email",
    "order": 3,
    "locked": false,
    "visible": true,
  }
];

var Info = React.createClass({
  render: function () {
    if (!this.props.church) { return (<div/>) }
    return (
      <div className="container-fluid" style={Style.sectionContainer}>
        <div className="row-fluid">
          <div style={{position:"relative"}}>
            <h3 style={{display:"inline-block",margin:"0 0 17px 0"}}>Members</h3>
            <div style={{position:"absolute",top:"-8px",right:"0"}}>
              <ButtonPrimary label={"Add"} onClick={this.handleClick_Add} />
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 hidden-xs"
            style={Style.detailColumn}>
            <Griddle results={this.getGriddleData()} columnMetadata={columnMeta}
              columns={["Name","Phone","Email"]} resultsPerPage={20}
              onRowClick={this.handleClick_Row} />
          </div>
          <div className="hidden-lg hidden-md hidden-sm col-xs-12"
            style={Style.detailColumn}>
            <Griddle results={this.getGriddleData()} columnMetadata={columnMeta}
              columns={["Name"]} resultsPerPage={10}
              onRowClick={this.handleClick_Row} />
          </div>
        </div>
      </div>
    )
  },

  getGriddleData: function () {
    var result = [];
    for (var i = 0; i < this.props.church.members.length; i++) {
      result.push({
        "memberId": this.props.church.members[i]._id,
        "churchId": this.props.church._id,
        "Name": this.props.church.members[i].lastName + ", " + this.props.church.members[i].firstName,
        "Phone": this.props.church.members[i].phone.main,
        "Email": this.props.church.members[i].email,
      });
    }
    return result;
  },

  handleChange_ChurchStore: function () {
    this.componentWillMount();
  },

  handleClick_Add: function () {
    browserHistory.push("/church/" + this.props.church._id + "/member/create");
  },

  handleClick_Row: function (gridRow, event) {
    browserHistory.push("/church/" + gridRow.props.data.churchId + "/member/" + gridRow.props.data.memberId);
  },
});

module.exports = Info;
