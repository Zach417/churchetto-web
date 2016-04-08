var React = require('react');
var Style = require('./Style.jsx');

var FormSelect = React.createClass({
  getInitialState: function () {
    return {
      isHovered: false,
      isFocused: false,
    }
  },

  render: function() {
    return (
      <select
        style={Style.select}
        value={this.props.value}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
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

  getStyle: function () {
    var style = Style.select;
    if (this.state.isHovered === true) {
      style = Style.selectHovered;
      if (this.state.isFocused === true) {
        style = Style.selectHoveredFocused
      }
    } else if (this.state.isFocused === true) {
      if (this.state.isFocused === true) {
        style = Style.selectFocused
      }
    }
    return style;
  },

  handleMouseEnter: function () {
    this.setState({
      isHovered: true,
      isFocused: this.state.isFocused,
    });
  },

  handleMouseLeave: function () {
    this.setState({
      isHovered: false,
      isFocused: this.state.isFocused,
    });
  },

  handleFocus: function () {
    this.setState({
      isHovered: this.state.isHovered,
      isFocused: true,
    });
  },

  handleBlur: function () {
    this.setState({
      isHovered: this.state.isHovered,
      isFocused: false,
    });
  },
});

module.exports = FormSelect;
