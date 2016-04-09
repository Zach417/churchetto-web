var React = require('react');
var Style = require('./Style.jsx');
var Designer = require('./Designer/Index.jsx');

var ReportBuilder = React.createClass({
  render: function () {
    return (
      <div>
        <Designer report={this.props.report} />
      </div>
    )
  },
});

module.exports = ReportBuilder;
