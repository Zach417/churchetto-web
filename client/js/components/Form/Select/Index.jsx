var React = require('react');
var Style = require('./Style.jsx');

var FormInput = React.createClass({
  render: function() {
    return (
      <select
        style={Style.select}
        value={this.props.value}
        onChange={this.props.onChange}>
        <option value="" />
        {this.getOptions()}
      </select>
    )
  },

  getOptions: function () {
    return this.props.options.map(function (option) {
      if (typeof option === "string") {
        return (
          <option value={option}>{option}</option>
        )
      }
      return (
        <option value={option.value}>{option.label}</option>
      )
    });
  },
});

module.exports = FormInput;
