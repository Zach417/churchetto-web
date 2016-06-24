var React = require('react');
var moment = require('moment');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Navigation = require('./Navigation.jsx');
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
    if (this.event.starts) {
      this.event.starts = moment(this.event.starts).format('MM/DD/YYYY h:mm a');
    }
    if (this.event.ends) {
      this.event.ends = moment(this.event.ends).format('MM/DD/YYYY h:mm a');
    }
    if (this.event.locationStarts) {
      this.event.locationStarts = moment(this.event.locationStarts).format('MM/DD/YYYY h:mm a');
    }
    if (this.event.locationEnds) {
      this.event.locationEnds = moment(this.event.locationEnds).format('MM/DD/YYYY h:mm a');
    }
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
    if (this.event.starts) {
      this.event.starts = moment(this.event.starts).format('MM/DD/YYYY h:mm a');
    }
    if (this.event.ends) {
      this.event.ends = moment(this.event.ends).format('MM/DD/YYYY h:mm a');
    }
    if (this.event.locationStarts) {
      this.event.locationStarts = moment(this.event.locationStarts).format('MM/DD/YYYY h:mm a');
    }
    if (this.event.locationEnds) {
      this.event.locationEnds = moment(this.event.locationEnds).format('MM/DD/YYYY h:mm a');
    }
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
    if (!this.state.event._id && !this.state.event.name) {
      return "New Event";
    }
    return this.state.event.name;
  },

  getChildComponent: function () {
    return React.cloneElement(this.props.children, {
      event: this.state.event,
      church: this.props.church,
      onChange: this.handleChange_Child,
    });
  },

  handleChange_Child: function (event) {
    this.event = resolveSubDocuments(event);
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

    var message = "Are you sure you wish to delete this event?";
    if (confirm(message)) {
      for (var i = 0; i < this.props.church.events.length; i++) {
        if (this.props.church.events[i]._id == this.state.event._id) {
          var church = this.props.church;
          church.events.splice(i,1);
          ChurchActions.update(church);
          browserHistory.push("/church/" + this.props.church._id + "/event");
          return;
        }
      }
    }
  },
});

module.exports = Event;
