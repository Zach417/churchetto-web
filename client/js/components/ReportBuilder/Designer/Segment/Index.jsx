var React = require('react');
var $ = require('jquery');
var Style = require('./Style.jsx');
var ReportObject = require('../Object/Index.jsx');

var Segment = React.createClass({
  getInitialState: function () {
    return {
      isHovered: false,
    }
  },

  componentWillMount: function () {
    this.segment = this.props.segment;
  },

  componentWillReceiveProps: function (nextProps) {
    this.segment = nextProps.segment;
  },

  render: function () {
    return (
      <div
        style={this.getContainerStyle()}
        onMouseEnter={this.handleMouseEnter_Container}
        onMouseLeave={this.handleMouseLeave_Container}>
        <div style={this.getHeadingStyle()}>
          {this.props.segment.name}
        </div>
        <div style={this.getBodyStyle()}>
          {this.getReportObjects()}
        </div>
      </div>
    )
  },

  getReportObjects: function () {
    return this.props.segment.objects.map(function (doc, i) {
      doc.segment = this.props.segment;
      return (
        <ReportObject
          key={i}
          segment={this.props.segment}
          reportObject={doc}
          onChange={this.handleChange} />
      )
    }.bind(this));
  },

  getContainerStyle: function () {
    var result = $.extend(true, {}, Style.container);
    result.height = this.props.segment.style.height;
    return result;
  },

  getHeadingStyle: function () {
    var result = $.extend(true, {}, Style.heading);
    result.height = this.props.segment.style.height;
    if (this.state.isHovered === true) {
      result.backgroundColor = "#ccc";
      result.fontWeight = "bold";
    }
    return result;
  },

  getBodyStyle: function () {
    var result = $.extend(true, {}, Style.body);
    if (this.props.segment.style) {
      for (var key in this.props.segment.style) {
        if (!this.props.segment.style.hasOwnProperty(key)) continue;
        result[key] = this.props.segment.style[key];
      }
    }
    result.position = "relative";
    result.overflow = "hidden";
    return result;
  },

  handleChange: function (object) {
    this.segment.objects.map(function (doc, i) {
      if (doc.index === object) {
        this.segment.objects[i] = object;
      }
    }.bind(this));
    this.props.onChange(this.segment);
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
});

module.exports = Segment;
