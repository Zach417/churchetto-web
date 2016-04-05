var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var EntitySummary = require('./EntitySummary.jsx');
var EntitySubSummary = require('./EntitySubSummary.jsx');
var ChurchStore = require('../../stores/ChurchStore');
var Churches = require('../Churches/Index.jsx');

var Church = React.createClass({
  getInitialState: function () {
    return {
      churches: '',
    }
  },

  componentWillMount: function () {
    ChurchStore.get(function (docs) {
      this.setState({
        churches: docs,
      });
    }.bind(this));
  },

  render: function () {
    if (!this.state.churches) {
      return (
        <div style={Style.entitySummary}>
          <p>Loading...</p>
        </div>
      )
    }

    return (
      <Churches />
    )
  },
});

module.exports = Church;
