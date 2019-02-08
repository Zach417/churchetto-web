var React = require('react');
var Style = require('./Style.jsx');

var FormTextArea = React.createClass({
  getInitialState: function () {
    return {
      isHovered: false,
      isFocused: false,
    }
  },

  render: function() {
    return (
      <textarea
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
    var style = Style.textarea;
    if (this.state.isHovered === true) {
      style = Style.textareaHovered;
      if (this.state.isFocused === true) {
        style = Style.textareaHoveredFocused
      }
    } else if (this.state.isFocused === true) {
      if (this.state.isFocused === true) {
        style = Style.textareaFocused
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

  handleChange: function (event) {
    var value = event.target.value;
    if (this.props.attribute) {
      this.props.onChange(this.props.attribute, value);
    } else {
      this.props.onChange(value);
    }
  },
});

module.exports = FormTextArea;
