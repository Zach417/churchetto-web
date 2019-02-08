var React = require('react');
var $ = require('jquery');
require('jquery-ui/draggable');
var Style = require('./Style.jsx');

function snapToGrid (x) {
  return 0.25*(Math.round(x/0.25));
}

var Object = React.createClass({
  getInitialState: function () {
    return {
      isHovered: false,
      id: Math.floor((Math.random() * 1000000000) + 1),
    }
  },

  componentWillMount: function () {
    this.reportObject = this.props.reportObject;
  },

  componentWillReceiveProps: function (nextProps) {
    this.reportObject = nextProps.reportObject;
  },

  componentDidMount: function () {
    this.setState({
      isHovered: this.state.isHovered,
      id: Math.floor((Math.random() * 1000000000) + 1),
    });
    $("#" + this.state.id).draggable();
    $("#" + this.state.id).on('mousedown',this.handleMouseDown_Container);
    $("#" + this.state.id).on('mouseup',this.handleMouseUp_Container);
    this.setPositionToGrid();
  },

  componentWillUnmount: function () {
    $("#" + this.state.id).off('mousedown',this.handleMouseDown_Container);
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

  handleMouseUp_Container: function (event) {
    $("#" + this.state.id).css({"z-index":""});
    $("#" + this.state.id).parent().css({"overflow":"hidden"});
    $("#report-builder").css({"overflow-x":"scroll"});
    this.setPositionToGrid();
    this.props.onChange(this.reportObject);
  },

  handleMouseDown_Container: function (event) {
    $("#" + this.state.id).css({"z-index":"1"});
    $("#" + this.state.id).parent().css({"overflow":"visible"});
    $("#report-builder").css({"overflow-x":"visible"});
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
    var position = {};

    //div used to estimate inches to px
    //super duper error-prone and won't work on phones
    var dpi = document.getElementById("dpi").offsetHeight;

    this.reportObject.style.top = parseFloat($("#" + this.state.id).position().top / dpi) + "in";
    this.reportObject.style.left = parseFloat($("#" + this.state.id).position().left / dpi) + "in";
    position.top = parseFloat(this.reportObject.style.top.replace('in',''));
    position.left = parseFloat(this.reportObject.style.left.replace('in',''));
    var objectHeight = parseFloat(this.props.reportObject.style.height.replace('in','')).toFixed(2);
    var objectWidth = parseFloat(this.props.reportObject.style.width.replace('in','')).toFixed(2);
    var segmentHeight = parseFloat(this.props.segment.style.height.replace('in','')).toFixed(2);
    var segmentWidth = parseFloat(this.props.reportObject.segment.report.size.x.replace('in','')).toFixed(2);
    position.top = snapToGrid(position.top);
    if (position.top <= 0) {
      position.top = 0;
    }
    if (position.top >= segmentHeight) {
      position.top = snapToGrid(segmentHeight - 0.25);
    }
    position.left = snapToGrid(position.left);
    if (position.left <= 0) {
      position.left = 0;
    }
    if (position.left >= segmentWidth - objectWidth) {
      position.left = snapToGrid(segmentWidth - objectWidth);
    }
    this.reportObject.style.top = position.top + "in";
    this.reportObject.style.left = position.left + "in";
    $("#" + this.state.id).css({
      top: position.top + "in",
      left: position.left + "in",
    });
  },
});

module.exports = Object;
