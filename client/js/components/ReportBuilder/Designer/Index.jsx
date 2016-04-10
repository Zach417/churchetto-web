var React = require('react');
var $ = require('jquery');
var Style = require('./Style.jsx');
var Ruler = require('./Ruler/Index.jsx');
var Tools = require('./Tools/Index.jsx');
var Segment = require('./Segment/Index.jsx');

var ReportBuilder = React.createClass({
  render: function () {
    return (
      <div style={Style.container}>
        <Tools report={this.props.report} />
        <div style={Style.designer}>
          <Ruler report={this.props.report} />
          {this.getPageHeaderSegments()}
          {this.getReportHeaderSegments()}
          {this.getBody()}
          {this.getReportFooterSegments()}
          {this.getPageFooterSegments()}
        </div>
      </div>
    )
  },

  getPageHeaderSegments: function () {
    return this.props.report.segments.page.header
      .sort()
      .map(function (doc, i) {
        return (
          <Segment
            key={i}
            report={this.props.report}
            segment={doc} />
        )
      }.bind(this));
  },

  getPageFooterSegments: function () {
    return this.props.report.segments.page.footer
      .sort()
      .map(function (doc, i) {
        return (
          <Segment
            key={i}
            report={this.props.report}
            segment={doc} />
        )
      }.bind(this));
  },

  getReportHeaderSegments: function () {
    return this.props.report.segments.report.header
      .sort()
      .map(function (doc, i) {
        return (
          <Segment
            key={i}
            report={this.props.report}
            segment={doc} />
        )
      }.bind(this));
  },

  getReportFooterSegments: function () {
    return this.props.report.segments.report.footer
      .sort()
      .map(function (doc, i) {
        return (
          <Segment
            key={i}
            report={this.props.report}
            segment={doc} />
        )
      }.bind(this));
  },

  getBody: function () {
    var result = [];
    if (this.props.report.segments.body.groups) {
      this.props.report.segments.body.groups.sort(function (a,b) {
        return a.name - b.name;
      }).map(function (group) {
        group.header.map(function (header, i) {
          result.push(
            <Segment
              key={"group-header-" + i}
              report={this.props.report}
              segment={header} />
          )
        }.bind(this))
      }.bind(this));
      this.props.report.segments.body.details.map(function (detail, i) {
        result.push(
          <Segment
            key={"detail-" + i}
            report={this.props.report}
            segment={detail} />
        )
      }.bind(this));
      this.props.report.segments.body.groups.sort(function (a,b) {
        return b.name - a.name;
      }).map(function (group) {
        group.footer.map(function (footer, i) {
          result.push(
            <Segment
              key={"group-footer-" + i}
              report={this.props.report}
              segment={footer} />
          )
        }.bind(this))
      }.bind(this));
      return result.map(function (doc, i) {
        return doc
      });
    }
  },
});

module.exports = ReportBuilder;
