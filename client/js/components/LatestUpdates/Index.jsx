var React = require('react');
var moment = require('moment');
var $ = require('jquery');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Label = require('../Form/Index.jsx').Label;
var Input = require('../Form/Index.jsx').Input;
var Button = require('../Button/Index.jsx');

var LatestUpdates = React.createClass({
  getInitialState: function () {
    var state = {changes: []};
    state.description = "Hope you all are having a great week! Here are the latest changes to Churchetto. Don't forget to email me with any questions or requests! -Zach (zach@churchetto.com)";
    state.changes.push("2/19/19 - Revamped the reports section of the site and squashed some bugs!");
    state.changes.push("2/8/19 - Added a Date Picker component for most date entry fields");
    state.changes.push("2/8/19 - Added Tip Jar so that users can contribute to the project");
    state.changes.push("2/8/19 - Added SSL Certificate -- all data to/from the server is encrypted");
    state.changes.push("2/8/19 - Added Reports component to dashboard");
    state.changes.push("2/8/19 - Added navigation buttons at top of screen for easier navigation");
    return state;
  },

  componentDidMount: function () {
  },

  componentWillUnmount: function () {
  },

  render: function () {
    return (
      <div style={Style.entitySummary}>
        <h1 style={{margin:"5px 0",textAlign:"left"}}>
          {"Churchetto Updates"}
        </h1>
        <p>
          {this.state.description}
        </p>
        <h3>
          Latest changes:
        </h3>
        <ul>
          {this.getChanges()}
        </ul>
      </div>
    )
  },

  getChanges: function () {
    return this.state.changes.map(function (change, i) {
      return (
        <li key={i}>{change}</li>
      )
    });
  }
});

module.exports = LatestUpdates;
