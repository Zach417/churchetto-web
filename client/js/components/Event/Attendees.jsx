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

var Attendees = React.createClass({
  getInitialState: function () {
    return {
      modify: false,
      index: -1,
      memberId: '',
      checkedInDate: '',
    }
  },

  render: function () {
    if (!this.props.event) { return (<div/>) }
    return (
      <div className="container-fluid" style={Style.sectionContainer}>
        <div className="row-fluid">
          <div style={{position:"relative"}}>
            <h3 style={{display:"inline-block",margin:"0 0 17px 0"}}>Attendees</h3>
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
    if (!this.props.church || !this.props.church.members) {
      return result;
    }
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
          <Label isRequired={true} label={"Checked In"} />
          <Input
            type={"text"}
            value={this.state.checkedInDate}
            onChange={this.handleChangeCheckedIn} />
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
        <Griddle results={this.getGriddleData()} columns={["Member","Checked In"]}
          resultsPerPage={20} onRowClick={this.handleClick_Row} />
      </div>
    )
  },

  getGriddleData: function () {
    var result = [];
    for (var i = 0; i < this.props.event.attendees.length; i++) {
      var member = '';
      for (var j = 0; j < this.props.church.members.length; j++) {
        if (this.props.church.members[j]._id ==
          this.props.event.attendees[i].memberId) {
          member = this.props.church.members[j].firstName + " " +
            this.props.church.members[j].lastName;
        }
      }
      var checkedInDate = '';
      if (this.props.event.attendees[i].checkedInDate) {
        checkedInDate = moment(this.props.event.attendees[i].checkedInDate)
          .format('M/DD/YYYY');
      }
      result.push({
        "eventId": this.props.event._id,
        "memberId": this.props.event.attendees[i].memberId,
        "index": i,
        "Member": member,
        "Checked In": checkedInDate,
      });
    }
    return result;
  },

  handleClick_Add: function () {
    this.setState({
      modify: true,
      index: this.props.event.attendees.length,
      memberId: '',
      checkedInDate: moment().format('MM/DD/YYYY'),
    })
  },

  handleClick_Submit: function () {
    var event = this.props.event;
    event.attendees[this.state.index] = {
      checkedInDate: this.state.checkedInDate,
      memberId: this.state.memberId,
    }
    this.props.onChange(event);
    return this.setState({
      modify: false,
      index: -1,
      memberId: '',
      checkedInDate: '',
    });
  },

  handleClick_Cancel: function () {
    this.setState({
      modify: false,
      index: -1,
      memberId: '',
      checkedInDate: '',
    })
  },

  handleClick_Delete: function () {
    var event = this.props.event;
    event.attendees.splice(this.state.index,1);
    this.props.onChange(event);
    return this.setState({
      modify: false,
      index: -1,
      memberId: '',
      checkedInDate: '',
    });
  },

  handleClick_Row: function (gridRow, event) {
    this.setState({
      modify: true,
      index: gridRow.props.data.index,
      memberId: gridRow.props.data.memberId,
      checkedInDate: gridRow.props.data["Checked In"],
    });
  },

  handleChange_Member: function (event) {
    this.setState({
      modify: this.state.modify,
      index: this.state.index,
      memberId: event.target.value,
      checkedInDate: this.state.checkedInDate,
    });
  },

  handleChangeCheckedIn: function (event) {
    this.setState({
      modify: this.state.modify,
      index: this.state.index,
      memberId: this.state.memberId,
      checkedInDate: event.target.value,
    });
  },
});

module.exports = Attendees;
