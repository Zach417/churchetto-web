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
    return {
      date: new Date(2019, 1, 8),
      description: "Hope you all are having a great week! Here are the latest changes to Churchetto. I'm aiming to starting doing regular updates to the site every 1 to 2 weeks. Don't forget to email me with any questions or requests! -Zach (zach@churchetto.com)",
      changes: ["Added a Date Picker component for most date entry fields", "Added Tip Jar so that users can contribute to the project", "Made it more difficult to delete your church", "Added SSL Certificate -- all data to/from the server is encrypted", "Added Reports component to dashboard", "Added navigation buttons at top of screen for easier navigation"]
    }
  },

  componentDidMount: function () {
  },

  componentWillUnmount: function () {
  },

  render: function () {
    return (
      <div style={Style.entitySummary}>
        <h1 style={{margin:"5px 0",textAlign:"left"}}>
          {"Churcheto Updates - " + moment(this.state.date).format("M/D/YYYY")}
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
