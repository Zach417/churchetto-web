var React = require('react');
var Griddle = require('griddle-react');
var browserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;

var LinkComponent = React.createClass({
  render: function(){
    var url ="/church/" + this.props.rowData.churchId + "/group/" + this.props.rowData.groupId;
    return <Link to={url}>{this.props.data}</Link>
  },
});

var columnMeta = [
  {
    "columnName": "groupId",
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
    "columnName": "Members",
    "order": 2,
    "locked": false,
    "visible": true,
  }
];

var Groups = React.createClass({
  render: function () {
    if (!this.props.church) { return (<div/>) }
    return (
      <div className="container-fluid" style={Style.sectionContainer}>
        <div className="row-fluid">
          <div style={{position:"relative"}}>
            <h3 style={{display:"inline-block",margin:"0 0 17px 0"}}>Groups</h3>
            <div style={{position:"absolute",top:"-8px",right:"0"}}>
              <ButtonPrimary label={"Add"} onClick={this.handleClick_Add} />
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 hidden-xs"
            style={Style.detailColumn}>
            <Griddle results={this.getGriddleData()} columnMetadata={columnMeta}
              columns={["Name","Members"]} resultsPerPage={20}
              onRowClick={this.handleClick_Row} />
          </div>
          <div className="hidden-lg hidden-md hidden-sm col-xs-12"
            style={Style.detailColumn}>
            <Griddle results={this.getGriddleData()} columnMetadata={columnMeta}
              columns={["Name","Members"]} resultsPerPage={10}
              onRowClick={this.handleClick_Row} />
          </div>
        </div>
      </div>
    )
  },

  getGriddleData: function () {
    var result = [];
    for (var i = 0; i < this.props.church.groups.length; i++) {
      result.push({
        "groupId": this.props.church.groups[i]._id,
        "churchId": this.props.church._id,
        "Name": this.props.church.groups[i].name,
        "Members": this.props.church.groups[i].members.length,
      });
    }
    return result;
  },

  handleClick_Add: function () {
    browserHistory.push("/church/" + this.props.church._id + "/group/create");
  },

  handleClick_Row: function (gridRow, event) {
    browserHistory.push("/church/" + gridRow.props.data.churchId + "/group/" + gridRow.props.data.groupId);
  },
});

module.exports = Groups;
