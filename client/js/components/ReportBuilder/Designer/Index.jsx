var React = require('react');
var $ = require('jquery');
var Style = require('./Style.jsx');
var Ruler = require('./Ruler/Index.jsx');
var Tools = require('./Tools/Index.jsx');
var Segment = require('./Segment/Index.jsx');

var ReportBuilder = React.createClass({
  componentWillMount: function () {
    this.report = this.props.report;
  },

  componentWillReceiveProps: function (nextProps) {
    this.report = nextProps.report;
  },

  render: function () {
    return (
      <div style={Style.container}>
        <Tools
          report={this.props.report}
          onSave={this.props.onSave} />
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
        doc.report = this.props.report;
        doc.style.backgroundColor = this.props.report.style.backgroundColor;
        doc.style.width = this.props.report.size.x;
        return (
          <Segment
            key={i}
            segment={doc}
            onChange={this.handleChange_PageHeaderSegments} />
        )
      }.bind(this));
  },

  getPageFooterSegments: function () {
    return this.props.report.segments.page.footer
      .sort()
      .map(function (doc, i) {
        doc.report = this.props.report;
        doc.style.backgroundColor = this.props.report.style.backgroundColor;
        doc.style.width = this.props.report.size.x;
        return (
          <Segment
            key={i}
            segment={doc}
            onChange={this.handleChange_PageFooterSegments} />
        )
      }.bind(this));
  },

  getReportHeaderSegments: function () {
    return this.props.report.segments.report.header
      .sort()
      .map(function (doc, i) {
        doc.report = this.props.report;
        doc.style.backgroundColor = this.props.report.style.backgroundColor;
        doc.style.width = this.props.report.size.x;
        return (
          <Segment
            key={i}
            segment={doc}
            onChange={this.handleChange_ReportHeaderSegments} />
        )
      }.bind(this));
  },

  getReportFooterSegments: function () {
    return this.props.report.segments.report.footer
      .sort()
      .map(function (doc, i) {
        doc.report = this.props.report;
        doc.style.backgroundColor = this.props.report.style.backgroundColor;
        doc.style.width = this.props.report.size.x;
        return (
          <Segment
            key={i}
            segment={doc}
            onChange={this.handleChange_ReportFooterSegments} />
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
          header.report = this.props.report;
          header.style.backgroundColor = this.props.report.style.backgroundColor;
          header.style.width = this.props.report.size.x;
          result.push(
            <Segment
              key={"group-header-" + i}
              segment={header}
              onChange={this.handleChange_BodyGroupHeaderSegments} />
          )
        }.bind(this))
      }.bind(this));
      this.props.report.segments.body.details.map(function (detail, i) {
        detail.report = this.props.report;
        detail.style.backgroundColor = this.props.report.style.backgroundColor;
        detail.style.width = this.props.report.size.x;
        result.push(
          <Segment
            key={"detail-" + i}
            segment={detail}
            onChange={this.handleChange_BodyDetailsSegments} />
        )
      }.bind(this));
      this.props.report.segments.body.groups.sort(function (a,b) {
        return b.name - a.name;
      }).map(function (group) {
        group.footer.map(function (footer, i) {
          footer.report = this.props.report;
          footer.style.backgroundColor = this.props.report.style.backgroundColor;
          footer.style.width = this.props.report.size.x;
          result.push(
            <Segment
              key={"group-footer-" + i}
              segment={footer}
              onChange={this.handleChange_BodyGroupFooterSegments} />
          )
        }.bind(this))
      }.bind(this));
      return result.map(function (doc, i) {
        return doc
      });
    }
  },

  handleChange_PageHeaderSegments: function (segment) {
    this.report.segments.page.header.map(function (doc, i) {
      if (doc.name === segment.name) {
        this.report.segments.page.header[i] = segment;
      }
    }.bind(this));
    this.props.onChange(this.report);
  },

  handleChange_PageFooterSegments: function (segment) {
    this.report.segments.page.footer.map(function (doc, i) {
      if (doc.name === segment.name) {
        this.report.segments.page.footer[i] = segment;
      }
    }.bind(this));
    this.props.onChange(this.report);
  },

  handleChange_ReportHeaderSegments: function (segment) {
    this.report.segments.report.header.map(function (doc, i) {
      if (doc.name === segment.name) {
        this.report.segments.report.header[i] = segment;
      }
    }.bind(this));
    this.props.onChange(this.report);
  },

  handleChange_ReportFooterSegments: function (segment) {
    this.report.segments.report.footer.map(function (doc, i) {
      if (doc.name === segment.name) {
        this.report.segments.report.footer[i] = segment;
      }
    }.bind(this));
    this.props.onChange(this.report);
  },

  handleChange_BodyGroupHeaderSegments: function (segment) {
    this.report.segments.body.groups.map(function (group, i) {
      group.header.map(function (doc, j) {
        if (doc.name === segment.name) {
          this.report.segments.body.groups[i].header[j] = segment;
        }
      }.bind(this));
    }.bind(this));
    this.props.onChange(this.report);
  },

  handleChange_BodyGroupFooterSegments: function (segment) {
    this.report.segments.body.groups.map(function (group, i) {
      group.footer.map(function (doc, j) {
        if (doc.name === segment.name) {
          this.report.segments.body.groups[i].footer[j] = segment;
        }
      }.bind(this));
    }.bind(this));
    this.props.onChange(this.report);
  },

  handleChange_BodyDetailsSegments: function (segment) {
    this.report.segments.body.details.map(function (doc, i) {
      if (doc.name === segment.name) {
        this.report.segments.body.details[i] = segment;
      }
    }.bind(this));
    this.props.onChange(this.report);
  },
});

module.exports = ReportBuilder;
