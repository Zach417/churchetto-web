var React = require('react');
var $ = require('jquery');
var Style = require('./Style.jsx');
var Tools = require('./Tools/Index.jsx');
var Segment = require('./Segment/Index.jsx');

var ReportBuilder = React.createClass({
  render: function () {
    return (
      <div>
        <Tools report={this.props.report} />
        <div className="container-fluid">
          <div id={this.getId()} className="row-fluid">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{padding:"0px"}}>
              <h1 style={{margin:"0px"}}>
                report designer
              </h1>
              <div>
                {this.getPageHeaderSegments()}
                {this.getReportHeaderSegments()}
                {this.getBody()}
                {this.getReportFooterSegments()}
                {this.getPageFooterSegments()}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },

  getId: function () {
    if (this.props.report._id) {
      return "report-designer-" + this.props.report._id;
    } else {
      return "report-create-designer";
    }
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

  getStyle: function () {
    var result = $.extend(true, {}, Style.container);
    if (this.props.report.style) {
      for (var key in this.props.report.style) {
        if (!this.props.report.style.hasOwnProperty(key)) continue;
        result[key] = this.props.report.style[key];
      }
    }
    return result;
  },
});

module.exports = ReportBuilder;
