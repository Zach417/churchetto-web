var React = require('react');
var $ = require('jquery');
require('jquery-ui/draggable');
var Style = require('./Style.jsx');

function roundToTen (x) {
  return 10*(Math.round(x/10));
}

var Segment = React.createClass({
  getInitialState: function () {
    return {
      isHovered: false,
      id: Math.floor((Math.random() * 1000000000) + 1),
    }
  },

  componentDidMount: function () {
    this.setState({
      isHovered: this.state.isHovered,
      id: Math.floor((Math.random() * 1000000000) + 1),
    });
    $("#" + this.state.id).draggable();
    $("#" + this.state.id).on('mousemove',this.handleMouseMove_Container);
    $("#" + this.state.id).on('mouseup',this.handleMouseUp_Container);
    this.setPositionToGrid();
  },

  componentWillUnmount: function () {
    $("#" + this.state.id).off('mousemove',this.handleMouseMove_Container);
    $("#" + this.state.id).off('mouseup',this.handleMouseUp_Container);
  },

  render: function () {
    return (
      <div
        id={this.state.id}
        style={this.getStyle()}
        onMouseEnter={this.handleMouseEnter_Container}
        onMouseLeave={this.handleMouseLeave_Container}>
        {this.getValue()}
      </div>
    )
  },

  getValue: function () {
    return this.props.reportObject.value;
  },

  getStyle: function () {
    var result = $.extend(true, {}, Style.container);
    if (this.props.reportObject.style) {
      for (var key in this.props.reportObject.style) {
        if (!this.props.reportObject.style.hasOwnProperty(key)) continue;
        result[key] = this.props.reportObject.style[key];
      }
    }
    var height = $("#" + this.state.id).height() - 3;
    var width = $("#" + this.state.id).width() - 3;
    result.backgroundSize = width + "px 1px, " + width + "px 1px, 1px " + height + "px, 1px " + height + "px";
    if (this.state.isHovered === true) {
      result.backgroundSize = width + "px 2px, " + width + "px 2px, 2px " + height + "px, 2px " + height + "px";
    }
    return result;
  },

  handleMouseMove_Container: function (event) {
    this.setPositionToGrid();
  },

  handleMouseUp_Container: function (event) {
    this.setPositionToGrid();
  },

  handleMouseEnter_Container: function () {
    this.setState({
      isHovered: true,
    });
  },

  handleMouseLeave_Container: function () {
    this.setState({
      isHovered: false,
    });
  },

  setPositionToGrid: function () {
    var position = $("#" + this.state.id).position();
    if (position.top) {
      position.top = roundToTen(position.top);
      if (position.top < 0) {
        position.top = 0;
      }
    }
    if (position.left) {
      position.left = roundToTen(position.left);
      if (position.left < 0) {
        position.left = 0;
      }
    }
    if (position.right) {
      position.right = roundToTen(position.right);
      if (position.right < 0) {
        position.right = 0;
      }
    }
    if (position.bottom) {
      position.bottom = roundToTen(position.bottom);
      if (position.bottom < 0) {
        position.bottom = 0;
      }
    }
    $("#" + this.state.id).css({top: position.top, left: position.left});
  },
});

module.exports = Segment;
