var React = require('react');
var moment = require('moment');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var EntitySubSummary = require('./EntitySubSummary.jsx');
var ChurchStore = require('../../stores/ChurchStore');

var Members = React.createClass({
  getInitialState: function () {
    return {
      members: '',
    }
  },

  componentWillMount: function () {
    ChurchStore.get(function (docs) {
      if (!docs) {
        return this.setState({
          members: []
        });
      }
      var result = [];
      for (var i = 0; i < docs.length; i++) {
        if (!docs[i].members) { continue; }
        for (var j = 0; j < docs[i].members.length; j++) {
          if (result.length > 5) { continue; }
          var member = docs[i].members[j];
          member.churchId = docs[i]._id;
          result.push(member);
        }
      }
      this.setState({
        members: result,
      });
    }.bind(this));
  },

  render: function () {
    if (!this.state.members) {
      return (
        <div style={Style.entitySummary}>
          <p>Loading...</p>
        </div>
      )
    }

    if (this.state.members.length === 0) {
      return (
        <div style={Style.entitySummary}>
          <h1 style={{margin:"5px 0",textAlign:"left"}}>{"Members"}</h1>
          <p>{"You don't have any members!"}</p>
        </div>
      )
    }

    return (
      <div style={Style.entitySummary}>
        <h1 style={{margin:"5px 0",textAlign:"left"}}>{"Members"}</h1>
        {this.getEventComponents()}
      </div>
    )
  },

  getEventComponents: function () {
    return this.state.members.sort(function(a,b){
      return new Date(b.date) - new Date(a.date);
    }).map(function (doc, i) {
      var onClick = function () {
        browserHistory.push("/church/" + doc.churchId + "/member/" + doc._id);
      }
      var firstName = "";
      if (doc.firstName) {
        firstName = doc.firstName;
      }
      var lastName = "";
      if (doc.lastName) {
        lastName = doc.lastName;
      }
      var email = "";
      if (doc.email) {
        email = doc.email;
      }
      var phone = "";
      if (doc.phone && doc.phone.main) {
        phone = doc.phone.main;
      }
      return (
        <EntitySubSummary onClick={onClick} key={i}>
          <h3 style={{margin:"5px 0",color:"#c36b74"}}>
            {firstName + " " + lastName}
          </h3>
          <p>
            {"(e) " + email + " | (p) " + phone}
          </p>
        </EntitySubSummary>
      )
    });
  },
});

module.exports = Members;
