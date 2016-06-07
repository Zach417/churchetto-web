var React = require('react');
var $ = require ('jquery');
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
      <div style={{position:"absolute",top:"-8px",right:"0"}}>
        <div style={{position:"relative",display:"inline-block"}}>
          <ButtonSecondary label={} onClick={this.handleClick_} />
          <div id="member-export-dropdown" style={{display:"none",position:"absolute",minWidth:"160px",backgroundColor:"#f4f4f4",boxShadow:"0px 8px 16px 0px rgba(0,0,0,0.2)",zIndex:"1"}}>
            <Link
              style={{cursor:"pointer",padding:"12px 16px",textDecoration:"none",display:"block"}}
              to={"/report-viewer/member-directory"}>
              {"Picture Directory (.pdf)"}
            </Link>
            {this.getOptions()}
      </div>
    )
  },

  handleClick_ExportDropdown: function () {
    $("#member-export-dropdown").toggle();
  },

  getOptions: function () {
    return this.props.options.map(function (option, i) {
      var key = "option-" + option.label + "-" + i;
      if (typeof option === "string") {
        return (
          <option key={key} value={option}>{option}</option>
        )
      }
      return (
        <option key={key} value={option.value}>{option.label}</option>
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

  handleChange: function (event) {
    var value = event.target.value;
    if (this.props.attribute) {
      this.props.onChange(this.props.attribute, value);
    } else {
      this.props.onChange(value);
    }
  },
});

module.exports = FormSelect;
