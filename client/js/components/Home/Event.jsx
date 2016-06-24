var React = require('react');
var moment = require('moment');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var EntitySubSummary = require('./EntitySubSummary.jsx');
var ChurchStore = require('../../stores/ChurchStore');

var Events = React.createClass({
  getInitialState: function () {
    return {
      churches: '',
      events: '',
    }
  },

  componentWillMount: function () {
    ChurchStore.get(function (docs) {
      if (!docs) {
        return this.setState({
          churches: [],
          events: [],
        });
      }
      var result = [];
      for (var i = 0; i < docs.length; i++) {
        if (!docs[i].events) { continue; }
        for (var j = 0; j < docs[i].events.length; j++) {
          if (result.length > 5) { continue; }
          var event = docs[i].events[j];
          event.churchId = docs[i]._id;
          result.push(event);
        }
      }
      this.setState({
        churches: docs,
        events: result,
      });
    }.bind(this));
  },

  render: function () {
    if (!this.state.events) {
      return (
        <div style={Style.entitySummary}>
          <p>Loading...</p>
        </div>
      )
    }

    if (this.state.events.length === 0) {
      return (
        <div style={Style.entitySummary}>
          <h1 style={{margin:"5px 0",textAlign:"left"}}>{"Events"}</h1>
          <p>{"You don't have any events!"}</p>
        </div>
      )
    }

    return (
      <div style={Style.entitySummary}>
        <h1 style={{margin:"5px 0",textAlign:"left"}}>{"Events"}</h1>
        {this.getEventComponents()}
      </div>
    )
  },

  getEventComponents: function () {
    return this.state.events.filter(function (e) {
      return e.status === "Pending";
    }).sort(function(a,b){
      return new Date(b.date) - new Date(a.date);
    }).map(function (doc, i) {
      var onClick = function () {
        browserHistory.push("/church/" + doc.churchId + "/event/" + doc._id);
      }
      var getContact = function () {
        if (doc.contact) {
          return (
            <span>Contact: {doc.contact}<br/></span>
          )
        }
      }
      var attendees = "0";
      var volunteers = "";
      var starts = "";
      var ends = "";
      if (doc.starts) {
        starts = moment(doc.starts).format("MMMM D h:mm a");
      }
      if (doc.ends) {
        ends = moment(doc.ends).format("MMMM D h:mm a")
      }
      if (doc.attendees) {
        attendees = doc.attendees.length.toString();
      }
      if (doc.volunteers) {
        doc.volunteers.map(function (volunteer) {
          this.state.churches.map(function (church) {
            church.members.map(function (member) {
              if (member._id == volunteer.memberId) {
                volunteers = volunteers + ", "
                  + member.firstName + " "
                  + member.lastName;
              }
            }.bind(this));
          }.bind(this));
        }.bind(this));
        if (volunteers === "") {
          volunteers = "-";
        } else {
          volunteers = volunteers.slice(2);
        }
      }
      return (
        <EntitySubSummary onClick={onClick} key={i}>
          <h3 style={{margin:"5px 0",color:"#c36b74"}}>{doc.name}</h3>
          <p>
            {starts + " - " + ends}<br/>
            {getContact()}
            Attendees: {attendees}<br/>
            Volunteers: {volunteers}
          </p>
        </EntitySubSummary>
      )
    }.bind(this));
  },
});

module.exports = Events;
