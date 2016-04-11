var React = require('react');
var Style = require('./Style.jsx');
var Button = require('./Button.jsx');

var ReportBuilder = React.createClass({
  render: function () {
    return (
      <div style={Style.container}>
        <h3 style={Style.header}>Tools</h3>
        <Button label={"Save"} onClick={this.props.onSave} />
        <Button label={"Objects"} />
        <Button label={"Fields"} />
        <Button label={"Equations"} />
      </div>
    )
  },
});

module.exports = ReportBuilder;
