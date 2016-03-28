var React = require('react');
var Style = require('./Style.jsx');

var FormInput = React.createClass({
  render: function() {
    if (this.props.isRequired) {
      return (
        <label style={Style.label}>
          <span style={Style.required}>
            {"* "}
          </span>
          <span>{this.props.label}</span>
        </label>
      )
    }

    return (
      <label style={Style.label}>
        <span>{this.props.label}</span>
      </label>
    )
  },
});

module.exports = FormInput;
