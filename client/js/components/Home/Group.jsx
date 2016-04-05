var React = require('react');
var moment = require('moment');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var EntitySubSummary = require('./EntitySubSummary.jsx');
var ChurchStore = require('../../stores/ChurchStore');

var Groups = React.createClass({
  getInitialState: function () {
    return {
      groups: '',
    }
  },

  componentWillMount: function () {
    ChurchStore.get(function (docs) {
      var result = [];
      for (var i = 0; i < docs.length; i++) {
        if (!docs[i].groups) { continue; }
        for (var j = 0; j < docs[i].groups.length; j++) {
          if (result.length > 5) { continue; }
          var group = docs[i].groups[j];
          group.churchId = docs[i]._id;
          result.push(group);
        }
      }
      this.setState({
        groups: result,
      });
    }.bind(this));
  },

  render: function () {
    if (!this.state.groups) {
      return (
        <div style={Style.entitySummary}>
          <p>Loading...</p>
        </div>
      )
    }

    if (this.state.groups.length === 0) {
      return (
        <div style={Style.entitySummary}>
          <h1 style={{margin:"5px 0",textAlign:"left"}}>{"Groups"}</h1>
          <p>{"You don't have any groups!"}</p>
        </div>
      )
    }

    return (
      <div style={Style.entitySummary}>
        <h1 style={{margin:"5px 0",textAlign:"left"}}>{"Groups"}</h1>
        {this.getEventComponents()}
      </div>
    )
  },

  getEventComponents: function () {
    return this.state.groups.sort(function(a,b){
      return new Date(b.date) - new Date(a.date);
    }).map(function (doc) {
      var onClick = function () {
        browserHistory.push("/church/" + doc.churchId + "/group/" + doc._id);
      }

      var members = 0;
      if (doc.members) {
        members = doc.members.length;
      }

      return (
        <EntitySubSummary onClick={onClick}>
          <h3 style={{margin:"5px 0",color:"#c36b74"}}>
            {doc.name}
          </h3>
          <p>
            Members: {members}
          </p>
        </EntitySubSummary>
      )
    });
  },
});

module.exports = Groups;
