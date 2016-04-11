var React = require('react');
var Style = require('./Style.jsx');
var Report = require('./Index.jsx');
var ReportStore = require('../../stores/ReportStore');

function resolveSubDocs (report) {
  if (!report.size) { report.size = { x: '0in', y: '0in' }; }
  if (!report.style) { report.style = {}; }
  if (!report.segments) { report.segments = {}; }
  if (!report.segments.page) { report.segments.page = {} };
  if (!report.segments.page.header) { report.segments.page.header = [] };
  if (!report.segments.page.footer) { report.segments.page.footer = [] };
  if (!report.segments.report) { report.segments.report = {} };
  if (!report.segments.report.header) { report.segments.report.header = [] };
  if (!report.segments.report.footer) { report.segments.report.footer = [] };
  if (!report.segments.body) { report.segments.body = {} };
  if (!report.segments.body.groups) { report.segments.body.groups = [] };
  if (!report.segments.body.details) { report.segments.body.details = [] };
  return report;
}

var Page = React.createClass({
  getInitialState: function () {
    return {
      report: resolveSubDocs({}),
    }
  },

  componentWillMount: function () {
    if (this.props.params && this.props.params.id) {
      ReportStore.getOne(this.props.params.id, function (report) {
        console.log(report);
        this.setState({
          report: resolveSubDocs(report),
        });
      }.bind(this));
    }
  },

  componentDidMount: function() {
    window.scrollTo(0, 0);
    ReportStore.addChangeListener(this.handleChange_ReportStore);
  },

  componentWillUnmount: function() {
    ReportStore.removeChangeListener(this.handleChange_ReportStore);
  },

  render: function () {
    return (
      <div style={Style.page}
        className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <Report
          report={this.state.report}
          children={this.props.children}
          onChange={this.handleChange_Child} />
      </div>
    )
  },

  handleChange_Child: function (report) {
    this.setState({
      report: report
    });
  },

  handleChange_ReportStore: function () {
    if (this.props.params && this.props.params.id) {
      ReportStore.getOne(this.props.params.id, function (report) {
        this.setState({
          report: report
        });
      }.bind(this));
    }
  },
});

module.exports = Page;
