var React = require('react');
var Style = require('./Style.jsx');
var ReportViewer = require('./Index.jsx');

var Component = React.createClass({
  render: function () {
    return (
      <ReportViewer id={this.props.params.id} />
    )
  },
});

module.exports = Component;
