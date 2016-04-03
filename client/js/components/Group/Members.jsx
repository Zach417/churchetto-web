var React = require('react');
var moment = require('moment');
var Griddle = require('griddle-react');
var browserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var Input = require('../Form/Index.jsx').Input;
var Label = require('../Form/Index.jsx').Label;
var Select = require('../Form/Index.jsx').Select;
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var ButtonDanger = require('../Button/Index.jsx').Danger;

var Members = React.createClass({
  getInitialState: function () {
    return {
      modify: false,
      index: -1,
      memberId: '',
    }
  },

  render: function () {
    if (!this.props.group) { return (<div/>) }
    return (
      <div className="container-fluid" style={Style.sectionContainer}>
        <div className="row-fluid">
          <div style={{position:"relative"}}>
            <h3 style={{display:"inline-block",margin:"0 0 17px 0"}}>Members</h3>
            <div style={{position:"absolute",top:"-8px",right:"0"}}>
              {this.getHeaderButton()}
            </div>
          </div>
          {this.getComponent()}
        </div>
      </div>
    )
  },

  getHeaderButton: function () {
    if (this.state.modify === true) {
      return (
        <ButtonSecondary label={"Cancel"} onClick={this.handleClick_Cancel} />
      )
    }

    return (
      <ButtonPrimary label={"Add"} onClick={this.handleClick_Add} />
    )
  },

  getMemberOptions: function () {
    var result = []
    for (var i = 0; i < this.props.church.members.length; i++) {
      result.push({
        value: this.props.church.members[i]._id,
        label: this.props.church.members[i].lastName + ", " + this.props.church.members[i].firstName,
      })
    }
    return result.sort(function(a, b) {
      var textA = a.label.toUpperCase();
      var textB = b.label.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  },

  getComponent: function () {
    if (this.state.modify === true) {
      return (
      <div className="row-fluid" style={Style.detailColumn}>
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
          style={Style.detailColumn}>
          <Label isRequired={true} label={"Member"} />
          <Select
            type={"text"}
            value={this.state.memberId}
            options={this.getMemberOptions()}
            onChange={this.handleChange_Member} />
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
          style={Style.detailColumnButton}>
          <ButtonPrimary label={"Submit"} onClick={this.handleClick_Submit} />
          <span style={{display:"inline-block",width:"5px"}} />
          <ButtonDanger label={"Delete"} onClick={this.handleClick_Delete} />
        </div>
      </div>
      )
    }

    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
        style={Style.detailColumn}>
        <Griddle results={this.getGriddleData()} columns={["Member"]}
          resultsPerPage={20} onRowClick={this.handleClick_Row} />
      </div>
    )
  },

  getGriddleData: function () {
    var result = [];
    for (var i = 0; i < this.props.group.members.length; i++) {
      var member = '';
      for (var j = 0; j < this.props.church.members.length; j++) {
        if (this.props.church.members[j]._id ==
          this.props.group.members[i].memberId) {
          member = this.props.church.members[j].firstName + " " +
            this.props.church.members[j].lastName;
        }
      }
      result.push({
        "groupId": this.props.group._id,
        "memberId": this.props.group.members[i].memberId,
        "index": i,
        "Member": member,
      });
    }
    return result;
  },

  handleClick_Add: function () {
    this.setState({
      modify: true,
      index: this.props.group.members.length,
      memberId: '',
    })
  },

  handleClick_Submit: function () {
    var group = this.props.group;
    group.members[this.state.index] = {
      memberId: this.state.memberId,
    }
    this.props.onChange(group);
    return this.setState({
      modify: false,
      index: -1,
      memberId: '',
    });
  },

  handleClick_Cancel: function () {
    this.setState({
      modify: false,
      index: -1,
      memberId: '',
    })
  },

  handleClick_Delete: function () {
    var group = this.props.group;
    group.members.splice(this.state.index,1);
    this.props.onChange(group);
    return this.setState({
      modify: false,
      index: -1,
      memberId: '',
    });
  },

  handleClick_Row: function (gridRow, group) {
    this.setState({
      modify: true,
      index: gridRow.props.data.index,
      memberId: gridRow.props.data.memberId,
    });
  },

  handleChange_Member: function (group) {
    this.setState({
      modify: this.state.modify,
      index: this.state.index,
      memberId: group.target.value,
    });
  },
});

module.exports = Members;
