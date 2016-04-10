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
      return (
        <ReportObject
          key={i}
          report={this.props.report}
          reportObject={doc} />
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
    // give it defaults of report
    if (this.props.report.style) {
      for (var key in this.props.report.style) {
        if (!this.props.report.style.hasOwnProperty(key)) continue;
        result[key] = this.props.report.style[key];
      }
    }
    // overwrite with any segment-specific styles
    if (this.props.segment.style) {
      for (var key in this.props.segment.style) {
        if (!this.props.segment.style.hasOwnProperty(key)) continue;
        result[key] = this.props.segment.style[key];
      }
    }
    result.width = this.props.report.size.x;
    result.position = "relative";
    result.overflow = "hidden";
    return result;
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
