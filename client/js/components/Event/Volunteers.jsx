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
var ChurchettoService = require('../../services/ChurchettoData');

var Volunteers = React.createClass({
  getInitialState: function () {
    return {
      modify: false,
      other: false,
      index: -1,
      memberId: '',
      role: '',
    }
  },

  render: function () {
    if (!this.props.event) { return (<div/>) }
    return (
      <div className="container-fluid" style={Style.sectionContainer}>
        <div className="row-fluid">
          <div style={{position:"relative"}}>
            <h3 style={{display:"inline-block",margin:"0 0 17px 0"}}>Volunteers</h3>
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
    if (this.state.modify === true || this.state.other === true) {
      return (
        <ButtonSecondary label={"Cancel"} onClick={this.handleClick_Cancel} />
      )
    }

    return (
      <div>
        <ButtonPrimary label={"Add"} onClick={this.handleClick_Add} />
        <span style={{display:"inline-block",width:"5px"}} />
        <ButtonSecondary label={". . ."} onClick={this.handleClick_Other} />
      </div>
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
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={true} label={"Role"} />
            <Input
              type={"text"}
              value={this.state.role}
              onChange={this.handleChange_Role} />
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

    if (this.state.other === true) {
      return (
        <div className="row-fluid" style={Style.detailColumn}>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
            style={Style.detailColumnButton}>
            <p>
              You can send out an email to members in your church
              requesting that open volunteer positions be filled
              by clicking the button below. If you have selected
              a group for this event, then the email will only be
              sent to members of that group. Be sure that no member
              is selected under the volunteer positions that
              you want available for acceptance in the event.
            </p>
            <ButtonPrimary label={"Request Volunteers"} onClick={this.handleClick_RequestVolunteers} />
          </div>
        </div>
      )
    }

    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
        style={Style.detailColumn}>
        <Griddle results={this.getGriddleData()} columns={["Member","Role"]}
          resultsPerPage={20} onRowClick={this.handleClick_Row} />
      </div>
    )
  },

  getGriddleData: function () {
    var result = [];
    for (var i = 0; i < this.props.event.volunteers.length; i++) {
      var member = '';
      for (var j = 0; j < this.props.church.members.length; j++) {
        if (this.props.church.members[j]._id ==
          this.props.event.volunteers[i].memberId) {
          member = this.props.church.members[j].firstName + " " +
            this.props.church.members[j].lastName;
        }
      }
      result.push({
        "eventId": this.props.event._id,
        "memberId": this.props.event.volunteers[i].memberId,
        "index": i,
        "Member": member,
        "Role": this.props.event.volunteers[i].role,
      });
    }
    return result;
  },

  handleClick_Add: function () {
    this.setState({
      modify: true,
      other: false,
      index: this.props.event.volunteers.length,
      memberId: '',
      role: '',
    })
  },

  handleClick_Submit: function () {
    var event = this.props.event;
    event.volunteers[this.state.index] = {
      role: this.state.role,
      memberId: this.state.memberId,
    }
    this.props.onChange(event);
    return this.setState({
      modify: false,
      other: false,
      index: -1,
      memberId: '',
      role: '',
    });
  },

  handleClick_RequestVolunteers: function () {
    ChurchettoService.requestVolunteersForEvent({
      eventId: this.props.event._id,
      churchId: this.props.church._id,
    }, function (data) {
      if (data.success === true) {
        alert("Emails successfully sent!");
      }
      this.setState({
        modify: false,
        other: false,
        index: -1,
        memberId: '',
        role: '',
      });
    }.bind(this));
  },

  handleClick_Cancel: function () {
    this.setState({
      modify: false,
      other: false,
      index: -1,
      memberId: '',
      role: '',
    })
  },

  handleClick_Other: function () {
    this.setState({
      modify: false,
      other: true,
      index: -1,
      memberId: '',
      role: '',
    })
  },

  handleClick_Delete: function () {
    var event = this.props.event;
    event.volunteers.splice(this.state.index,1);
    this.props.onChange(event);
    return this.setState({
      modify: false,
      other: false,
      index: -1,
      memberId: '',
      role: '',
    });
  },

  handleClick_Row: function (gridRow, event) {
    this.setState({
      modify: true,
      other: false,
      index: gridRow.props.data.index,
      memberId: gridRow.props.data.memberId,
      role: gridRow.props.data.Role,
    });
  },

  handleChange_Member: function (value) {
    this.setState({
      modify: this.state.modify,
      other: this.state.other,
      index: this.state.index,
      memberId: value,
      role: this.state.role,
    });
  },

  handleChange_Role: function (value) {
    this.setState({
      modify: this.state.modify,
      other: this.state.other,
      index: this.state.index,
      memberId: this.state.memberId,
      role: value,
    });
  },
});

module.exports = Volunteers;
