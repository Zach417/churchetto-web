var React = require('react');
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var PlanManagerService = require('../../services/ChurchettoData');

var Highlights = React.createClass({
  render: function() {
    return (
      <div style={Style.highlights}>
        <div style={Style.highlightsHeader}>{"You'll love Churchetto"}</div>
        <div style={Style.highlightsBody}>
          <div>
            <b>{"Powerful "}</b>
            tools
          </div>
        </div>
        <div style={{padding: "10px"}}>
          <div>
            <span style={Style.checkMark}>
              <b>{"✓ "}</b>
            </span>
            Email Workflows
          </div>
          <div>
            <span style={Style.checkMark}>
              <b>{"✓ "}</b>
            </span>
            Volunteer Management
          </div>
          <div>
            <span style={Style.checkMark}>
              <b>{"✓ "}</b>
            </span>
            {"World-class Interface"}
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Highlights;
