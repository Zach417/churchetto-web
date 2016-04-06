var React = require('react');
var moment = require('moment');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var EntitySubSummary = require('./EntitySubSummary.jsx');
var ChurchStore = require('../../stores/ChurchStore');

var Campus = React.createClass({
  getInitialState: function () {
    return {
      campuses: '',
    }
  },

  componentWillMount: function () {
    ChurchStore.get(function (docs) {
      if (!docs) {
        return this.setState({
          campuses: []
        });
      }
      var result = [];
      for (var i = 0; i < docs.length; i++) {
        if (!docs[i].campuses) { continue; }
        for (var j = 0; j < docs[i].campuses.length; j++) {
          if (result.length > 5) { continue; }
          var campuses = docs[i].campuses[j];
          campuses.churchId = docs[i]._id;
          result.push(campuses);
        }
      }
      this.setState({
        campuses: result,
      });
    }.bind(this));
  },

  render: function () {
    if (!this.state.campuses) {
      return (
        <div style={Style.entitySummary}>
          <p>Loading...</p>
        </div>
      )
    }

    if (this.state.campuses.length === 0) {
      return (
        <div style={Style.entitySummary}>
          <h1 style={{margin:"5px 0",textAlign:"left"}}>{"Campuses"}</h1>
          <p>{"You don't have any campuses!"}</p>
        </div>
      )
    }

    return (
      <div style={Style.entitySummary}>
        <h1 style={{margin:"5px 0",textAlign:"left"}}>{"Campuses"}</h1>
        {this.getCampusComponents()}
      </div>
    )
  },

  getCampusComponents: function () {
    return this.state.campuses.sort(function(a,b){
      return new Date(b.date) - new Date(a.date);
    }).map(function (doc, i) {
      var onClick = function () {
        browserHistory.push("/church/" + doc.churchId + "/campus/" + doc._id);
      }
      var city = "";
      if (doc.address && doc.address.city) {
        city = doc.address.city;
      }
      var state = "";
      if (doc.address && doc.address.state) {
        state = doc.address.state;
      }
      return (
        <EntitySubSummary onClick={onClick} key={i}>
          <h3 style={{margin:"5px 0",color:"#c36b74"}}>{doc.name}</h3>
          <p>
            {city + " | " + state}
          </p>
        </EntitySubSummary>
      )
    });
  },
});

module.exports = Campus;
