var React = require('react');
var Style = require('./Style.jsx');

var FormInput = React.createClass({
  getInitialState: function () {
    return {
      isHovered: false,
      isFocused: false,
    }
  },

  render: function() {
    return (
      <input
        style={this.getStyle()}
        value={this.props.value}
        type={this.props.type}
        placeholder={this.props.placeholder}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onChange={this.handleChange}/>
    )
  },

  getStyle: function () {
    var style = Style.input;
    if (this.state.isHovered === true) {
      style = Style.inputHovered;
      if (this.state.isFocused === true) {
        style = Style.inputHoveredFocused
      }
    } else if (this.state.isFocused === true) {
      if (this.state.isFocused === true) {
        style = Style.inputFocused
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
    if (this.props.onBlur) {
      this.props.onBlur();
    }
    this.setState({
      isHovered: this.state.isHovered,
      isFocused: false,
    });
  },

  handleChange: function (event) {
    var value = event.target.value;
    if (this.props.attribute) {
      this.props.onChange(this.props.attribute, value);
    } else {
      this.props.onChange(value);
    }
  },
});

module.exports = FormInput;
