var React = require('react');
var $ = require ('jquery');
var Link = require('react-router').Link;
var Griddle = require('griddle-react');
var jsonexport = require('jsonexport');
var moment = require('moment');
var browserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;

function convertToCSV(objArray) {
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = '';
  for (var i = 0; i < array.length; i++) {
    var line = '';
    for (var index in array[i]) {
      if (line != '') line += ','
      line += array[i][index];
    }
    str += line + '\r\n';
  }
  return str;
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
              <div style={{position:"relative",display:"inline-block"}}>
                <ButtonSecondary label={"Export"} onClick={this.handleClick_ExportDropdown} />
                <div id="member-export-dropdown" style={{display:"none",position:"absolute",minWidth:"160px",backgroundColor:"#f4f4f4",boxShadow:"0px 8px 16px 0px rgba(0,0,0,0.2)",zIndex:"1"}}>
                  <Link
                    style={{cursor:"pointer",padding:"12px 16px",textDecoration:"none",display:"block"}}
                    to={"/report-viewer/member-directory"}>
                    {"Picture Directory (.pdf)"}
                  </Link>
                  <Link
                    style={{cursor:"pointer",padding:"12px 16px",textDecoration:"none",display:"block"}}
                    to={"/report-viewer/birthday-report"}>
                    {"Birthdays (.pdf)"}
                  </Link>
                  <a style={{cursor:"pointer",padding:"12px 16px",textDecoration:"none",display:"block"}} onClick={this.handleClick_Export}>
                    {"Member Data (.csv)"}
                  </a>
                </div>
              </div>
              <span style={{marginRight:"10px"}} />
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

  handleClick_Add: function () {
    browserHistory.push("/church/" + this.props.church._id + "/member/create");
  },

  handleClick_ExportDropdown: function () {
    $("#member-export-dropdown").toggle();
  },

  handleClick_Export: function () {
    if (!this.props.church.members) { return; }

    var members = [];
    this.props.church.members.map(function (member) {
      delete member._id;
      if (member.baptizedOn) {
        member.baptizedOn = moment(member.baptizedOn).format('MM/DD/YYYY');
      }
      if (member.dateOfBirth) {
        member.dateOfBirth = moment(member.dateOfBirth).format('MM/DD/YYYY');
      }
      if (member.dateOfDeath) {
        member.dateOfDeath = moment(member.dateOfDeath).format('MM/DD/YYYY');
      }
      members.push(member);
    });

    jsonexport(members ,function(err, csv){
        if(err) return console.log(err);

        var fileName = "Churchetto - " + this.props.church.name + " Members";
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
    browserHistory.push("/church/" + gridRow.props.data.churchId + "/member/" + gridRow.props.data.memberId);
  },
});

module.exports = Info;
