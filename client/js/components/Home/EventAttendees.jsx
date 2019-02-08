var React = require('react');
var Style = require('./Style.jsx');
var ChurchStore = require('../../stores/ChurchStore');

var Component = React.createComponent({
  getInitialState: function () {
    return {
      attendees: "",
    }
  },

  componentWillMount: function () {
    ChurchStore.get
  },

  render: function () {
    return (
      <span>
        Attendees: {this.state.attendees}
      </span>
    )
  },
});

module.exports = Component;
