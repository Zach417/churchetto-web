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
        onChange={this.props.onChange}/>
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
    this.setState({
      isHovered: this.state.isHovered,
      isFocused: false,
    });
  },
});

module.exports = FormInput;
