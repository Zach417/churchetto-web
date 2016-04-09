var React = require('react');
var Style = require('./Style.jsx');
var Report = require('./Index.jsx');
var ReportStore = require('../../stores/ReportStore');

var Page = React.createClass({
  getInitialState: function () {
    return {
      report: {}
    }
  },

  componentWillMount: function () {
    return this.setState({
      report: require('./TestData.jsx'),
    })
    if (this.props.params && this.props.params.id) {
      ReportStore.getOne(this.props.params.id, function (report) {
        this.setState({
          report: report
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
      <div style={Style.container}
        className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <Report
          report={this.state.report}
          children={this.props.children}
          onChange={this.handleChange_Child} />
      </div>
    )
  },

  handleChange_Child: function (report) {
    this.setState(report);
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
