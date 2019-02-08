var React = require('react');
var Style = require('./Style.jsx');
var Designer = require('./Designer/Index.jsx');
var ReportActions = require('../../actions/ReportActions');

function removeCircularReferences (report) {
  report.segments.page.header.map(function (doc,i) {
    report.segments.page.header[i].report = null;
    report.segments.page.header[i].objects.map(function (doc2,j) {
      report.segments.page.header[i].objects[j].segment = null;
    });
  });
  report.segments.page.footer.map(function (doc,i) {
    report.segments.page.footer[i].report = null;
    report.segments.page.footer[i].objects.map(function (doc2,j) {
      report.segments.page.footer[i].objects[j].segment = null;
    });
  });
  report.segments.report.header.map(function (doc,i) {
    report.segments.report.header[i].report = null;
    report.segments.report.header[i].objects.map(function (doc2,j) {
      report.segments.report.header[i].objects[j].segment = null;
    });
  });
  report.segments.report.footer.map(function (doc,i) {
    report.segments.report.footer[i].report = null;
    report.segments.report.footer[i].objects.map(function (doc2,j) {
      report.segments.report.footer[i].objects[j].segment = null;
    });
  });
  report.segments.body.groups.map(function (doc,i) {
    report.segments.body.groups[i].header.map(function (doc2,j) {
      report.segments.body.groups[i].header[j].report = null;
      report.segments.body.groups[i].header[j].objects.map(function (doc3,k) {
        report.segments.body.groups[i].header[j].objects[k].segment = null;
      });
    });
    report.segments.body.groups[i].footer.map(function (doc2,j) {
      report.segments.body.groups[i].footer[j].report = null;
      report.segments.body.groups[i].footer[j].objects.map(function (doc3,k) {
        report.segments.body.groups[i].footer[j].objects[k].segment = null;
      });
    });
  });
  report.segments.body.details.map(function (doc,i) {
    report.segments.body.details[i].report = null;
    report.segments.body.details[i].objects.map(function (doc2,j) {
      report.segments.body.details[i].objects[j].segment = null;
    });
  });
  return report;
}

var ReportBuilder = React.createClass({
  componentWillMount: function () {
    this.report = this.props.report;
  },

  componentWillReceiveProps: function (nextProps) {
    this.report = nextProps.report;
  },

  render: function () {
    return (
      <div id="report-builder" style={Style.container}>
        <div id="dpi" style={{
          height: "1in",
          left: "-100%",
          position: "absolute",
          top: "-100%",
          width: "1in",
        }} />
        <Designer
          report={this.props.report}
          onChange={this.handleChange}
          onSave={this.handleSave} />
      </div>
    )
  },

  handleChange: function (report) {
    this.report = report;
  },

  handleSave: function () {
    var report = removeCircularReferences(this.report);
    if (!report._id) {
      ReportActions.create(report);
    } else {
      ReportActions.update(report);
    }
  },
});

module.exports = ReportBuilder;
