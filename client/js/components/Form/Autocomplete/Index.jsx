var React = require('react');
var $ = require ('jquery');
var S = require ('string');
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var Input = require('../Input/Index.jsx');
var ButtonSecondary = require('../../Button/Index.jsx').Secondary;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var AutocompleteSelect = React.createClass({
  render: function () {
    return (
      <div
        id={"dropdown-" + this.props.id}
        style={{display:"none",position:"absolute",minWidth:"160px",backgroundColor:"#f4f4f4",boxShadow:"0px 8px 16px 0px rgba(0,0,0,0.2)",zIndex:"1"}}>
        {this.getOptions()}
      </div>
    )
  },

  getOptions: function () {
    return this.props.options.map(function (option, i) {
      var key = "option-" + option.label + "-" + i;
      var handleClick = function () {
        if (typeof option === "string") {
          this.props.onSelect(option);
        } else {
          this.props.onSelect(option.value);
        }
      }.bind(this)
      if (typeof option === "string") {
        return (
          <option
            key={key}
            style={{padding:"5px",cursor:"pointer"}}
            value={option}
            onClick={handleClick}>
            {option}
          </option>
        )
      }
      return (
        <option
          key={key}
          style={{padding:"5px",cursor:"pointer"}}
          value={option.value}
          onClick={handleClick}>
          {option.label}
        </option>
      )
    }.bind(this));
  },
});

var Autocomplete = React.createClass({
  getInitialState: function () {
    return {
      id: getRandomInt(0,1000000000),
      isHovered: false,
      isFocused: false,
    }
  },

  render: function () {
    return (
      <div>
        <div style={{position:"relative"}}>
          <Input
            type={"text"}
            value={this.props.value}
            onChange={this.handleChange}
            onClick={this.handleClick}
            onBlur={this.handleBlur} />
          <AutocompleteSelect
            id={this.state.id}
            options={this.getOptions()}
            onSelect={this.handleOptionSelect} />
        </div>
      </div>
    )
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

  getOptions: function () {
    return this.props.options.filter(function (option) {
      if (option.value && option.label) {
        return S(option.value).contains(this.props.value) || S(option.label).contains(this.props.value);
      }
      return S(option).contains(this.props.value);
    }.bind(this));
  },

  handleMouseEnter: function () {
    this.setState({
      id: this.state.id,
      isHovered: true,
      isFocused: this.state.isFocused,
    });
  },

  handleMouseLeave: function () {
    this.setState({
      id: this.state.id,
      isHovered: false,
      isFocused: this.state.isFocused,
    });
  },

  handleFocus: function () {
    this.setState({
      id: this.state.id,
      isHovered: this.state.isHovered,
      isFocused: true,
    });
  },

  handleClick: function () {
    if (this.props.value !== "") {
      $("#dropdown-" + this.state.id).show();
    }
  },

  handleBlur: function () {
    var values = this.props.options.filter(function (option) {
      if (option.value && option.label) {
        return S(option.value).contains(this.props.value) || S(option.label).contains(this.props.value);
      }
      return S(option).contains(this.props.value);
    }.bind(this));

    if (this.props.value == "") {
      return;
    }

    // make it so that there has to be an exact match
    // in order to save the input
    if (this.props.strict === true && (values.length === 0 || !values[0])) {
      if (this.props.attribute) {
        this.props.onChange(this.props.attribute, "");
      } else {
        this.props.onChange("");
      }
    } /*else if (values.length === 0 || !values[0]) {
      return;
    } else {
      if (this.props.attribute) {
        this.props.onChange(this.props.attribute, values[0]);
      } else {
        this.props.onChange(values[0]);
      }
    }*/

    $("#dropdown-" + this.state.id).delay(100).hide(0);
  },

  handleOptionSelect: function (value) {
    $("#dropdown-" + this.state.id).hide();
    if (this.props.attribute) {
      this.props.onChange(this.props.attribute, value);
    } else {
      this.props.onChange(value);
    }
  },

  handleChange: function (value) {
    $("#dropdown-" + this.state.id).show();
    if (this.props.attribute) {
      this.props.onChange(this.props.attribute, value);
    } else {
      this.props.onChange(value);
    }
  },
});

module.exports = Autocomplete;
