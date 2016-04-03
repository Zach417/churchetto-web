var React = require('react');
var moment = require('moment');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Navigation = require('./Navigation.jsx');
var Info = require('./Info.jsx');
var Attendees = require('./Attendees.jsx');
var Volunteers = require('./Volunteers.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var ButtonDanger = require('../Button/Index.jsx').Danger;
var ChurchActions = require('../../actions/ChurchActions');

function resolveSubDocuments (event) {
  if (!event) { event = {} }
  if (!event.attendees) { event.attendees = [] }
  if (!event.volunteers) { event.volunteers = [] }
  return event;
}

var Event = React.createClass({
  getInitialState: function () {
    this.event = resolveSubDocuments({});
    return {
      event: this.event
    }
  },

  componentWillMount: function () {
    this.event = resolveSubDocuments(this.props.event);
    this.setState({
      event: this.event
    });
  },

  componentDidMount: function() {
    window.scrollTo(0, 0);
  },

  componentWillReceiveProps: function (nextProps) {
    if (!nextProps.event) {
      return;
    }
    this.event = resolveSubDocuments(nextProps.event);
    this.setState({
      event: this.event
    });
  },

  render: function () {
    return (
      <div style={Style.componentContainerNoPadding}>
        <div style={{padding:"0 20px 0 20px"}}>
          <h1 style={{wordBreak:"break-word"}}>
            {this.getHeading()}
          </h1>
        </div>
        <div style={{margin:"0 0 20px 0",backgroundColor: "#666666"}}>
          <Navigation cid={this.props.church._id} mid={this.state.event._id} />
        </div>
        <div style={{padding:"0 20px 20px 20px"}}>
          {this.getChildComponent()}
        </div>
        <div style={{padding:"0 20px 20px 20px"}}>
          <ButtonPrimary label={"Save"} onClick={this.handleClick_Submit} />
          <span style={{display:"inline-block",width:"5px"}} />
          <ButtonSecondary label={"Cancel"} onClick={this.handleClick_Cancel} />
          <span style={{display:"inline-block",width:"5px"}} />
          <ButtonDanger label={"Delete"} onClick={this.handleClick_Delete} />
        </div>
      </div>
    )
  },

  getHeading: function () {
    var event = this.state.event;
    if (!event._id && !event.name) {
      return "New Event";
    }
    return event.name;
  },

  getChildComponent: function () {
    var path = window.location.pathname;
    var basePath = "/church/" + this.props.church._id + "/event/"
      + this.state.event._id;
    if (!this.state.event._id) {
      basePath = "/church/" + this.props.church._id + "/event/create";
    }
    if (path === basePath) {
      return (
        <Info event={this.state.event} church={this.props.church} onChange={this.handleChange_Child} />
      )
    } else if (path === basePath + "/info") {
      return (
        <Info event={this.state.event} church={this.props.church} onChange={this.handleChange_Child} />
      )
    } else if (path === basePath + "/attendees") {
      return (
        <Attendees event={this.state.event} church={this.props.church} onChange={this.handleChange_Child} />
      )
    } else if (path === basePath + "/volunteers") {
      return (
        <Volunteers event={this.state.event} church={this.props.church} onChange={this.handleChange_Child} />
      )
    }
  },

  handleChange_Child: function (event) {
    this.setState({
      event: this.event
    });
  },

  handleClick_Submit: function () {
    var church = this.props.church;
    var events = [];
    if (this.props.church.events) {
      events = this.props.church.events;
    }
    if (this.event.starts) {
      this.event.starts = moment(this.event.starts).utc();
    }
    if (this.event.ends) {
      this.event.ends = moment(this.event.ends).utc();
    }
    if (this.event.attendees) {
      for (var j = 0; j < this.event.attendees.length; j++) {
        if (this.event.attendees[j].checkedInDate) {
          this.event.attendees[j].checkedInDate = moment(this.event.attendees[j].checkedInDate).utc();
        }
      }
    }
    if (this.event._id) {
      for (var i = 0; i < events.length; i++) {
        if (events[i] == this.event._id) {
          events[i] = this.event;
        }
      }
      church.events = events;
      ChurchActions.update(church);
    } else {
      events.push(this.event);
      church.events = events;
      ChurchActions.update(church);
    }
    browserHistory.push("/church/" + this.props.church._id + "/event");
  },

  handleClick_Cancel: function () {
    browserHistory.push("/church/" + this.props.church._id + "/event");
  },

  handleClick_Delete: function () {
    if (!this.props.church || !this.props.church.events) {
      browserHistory.push("/church/" + this.props.church._id + "/event");
      return;
    }

    for (var i = 0; i < this.props.church.events.length; i++) {
      if (this.props.church.events[i]._id == this.state.event._id) {
        var church = this.props.church;
        church.events.splice(i,1);
        ChurchActions.update(church);
        browserHistory.push("/church/" + this.props.church._id + "/event");
        return;
      }
    }
  },
});

module.exports = Event;
