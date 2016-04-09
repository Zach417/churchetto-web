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
        style={Style.container}
        className="container-fluid"
        onMouseEnter={this.handleMouseEnter_Container}
        onMouseLeave={this.handleMouseLeave_Container}>
        <div className="row-fluid">
          <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2"
            style={this.getHeadingStyle()}>
            {this.props.segment.name}
          </div>
          <div className="col-lg-11 col-md-11 col-sm-10 col-xs-10"
            style={this.getBodyStyle()}>
            {this.getReportObjects()}
          </div>
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

  getHeadingStyle: function () {
    var result = $.extend(true, {}, Style.segmentHeading);
    if (this.state.isHovered === true) {
      result.fontWeight = "bold";
    }
    result.cursor = "move";
    return result;
  },

  getBodyStyle: function () {
    var result = $.extend(true, {}, Style.container);
    // give it defaults of report
    if (this.props.report.style) {
      for (var key in this.props.report.style) {
        if (!this.props.report.style.hasOwnProperty(key)) continue;
        result[key] = this.props.report.style[key];
      }
    }
    // overwrite with any object-specific styles
    if (this.props.segment.style) {
      for (var key in this.props.segment.style) {
        if (!this.props.segment.style.hasOwnProperty(key)) continue;
        result[key] = this.props.segment.style[key];
      }
    }
    result.position = "relative";
    result.overflow = "hidden";
    if (this.state.isHovered === true) {
      result.border = "1px solid #ccc";
    }
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
