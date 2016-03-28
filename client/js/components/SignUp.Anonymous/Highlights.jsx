var React = require('react');
var Style = require('./Style.jsx');
var Banner = require('./Banner.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var PlanManagerService = require('../../services/ChurchettoData');

var Highlights = React.createClass({
  render: function() {
    return (
      <div style={Style.highlights}>
        <div style={Style.highlightsHeader}>{"You'll love Churchetto"}</div>
        <div style={Style.highlightsBody}>
          <div>
            <b>Powerful</b>
            tools</div>
          <div>
            <b>Powerful</b>
            recomendations</div>
        </div>
        <div style={{
          padding: "10px"
        }}>
          <div>
            <span style={{
              color: "green"
            }}>
              <b>✓</b>
            </span>
            Unlimited Storage</div>
          <div>
            <span style={{
              color: "green"
            }}>
              <b>✓</b>
            </span>
            Clear Reminders</div>
          <div>
            <span style={{
              color: "green"
            }}>
              <b>✓</b>
            </span>
            Essential Analytics</div>
        </div>
      </div>
    )
  }
});

module.exports = Highlights;
