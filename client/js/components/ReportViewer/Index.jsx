var React = require('react');
var browserHistory = require('react-router').browserHistory;
var $ = require('jquery');
var Style = require('./Style.jsx');
var Reports = require('./Reports.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var Label = require ('../Form/Index.jsx').Label;
var Input = require ('../Form/Index.jsx').Input;
var Select = require ('../Form/Index.jsx').Select;
var ChurchStore = require('../../stores/ChurchStore');

var Component = React.createClass({
  getInitialState: function () {
    return {
      data: {
        churches: [],
      },
      options: {
        go: false,
        report: '',
        churchId: '',
        parameters: [],
      },
    }
  },

  componentWillMount: function () {
    ChurchStore.get(function (churches) {
      var state = this.state;
      state.data.churches = churches;
      if (churches.length === 1) {
        state.options.go = true;
        state.options.churchId = churches[0]._id;
      }
      this.setState(state)
    }.bind(this));
  },

  componentDidMount: function () {
    if (this.props.id) {
      var state = this.state;
      state.options.report = this.props.id;
      this.setState(state);
    }
  },

  render: function () {
    return (
      <div className="container">
        <div
          style={{
            backgroundColor: "#f4f4f4",
            padding: "15px",
            border: "1px solid #ccc",
            marginTop: "15px",
          }}
          className="row">
          <h3 style={{margin:"5px 0px"}}>Report Viewer</h3>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Report"} />
            <Select
              value={this.state.options.report}
              options={this.getReportOptions()}
              onChange={this.handleChange_Report} />
          </div>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Church"} />
            <Select
              value={this.state.options.churchId}
              options={this.getChurchOptions()}
              onChange={this.handleChange_Church} />
          </div>
          {this.getParameterOptions()}
          {this.getGoButton()}
        </div>
        <div
          style={{
            backgroundColor: "#f4f4f4",
            border: "1px solid #ccc",
            marginTop: "15px",
            marginBottom: "15px",
          }}
          className="row">
          <div
            className="col-xs-12"
            style={{marginTop:"15px"}}>
            <p id="report-viewer-wait" style={{display:"none"}}>
              {"May take a few seconds to load..."}
            </p>
            {this.getReportObject()}
          </div>
        </div>
      </div>
    )
  },

  getParameterOptions: function () {
    if (!this.state.options.report) { return; }
    var report = Reports.find(function (report) {
      return report.path === this.state.options.report;
    }.bind(this));
    if (!report) { return; }
    return report.parameters.map(function (parameter) {
      var handleChange_Parameter = function (attribute, value) {
        var index = -1;
        var state = this.state;
        state.options.go = false;
        state.options.parameters.map(function (currentParameter,i) {
          if (currentParameter.label === attribute) { index = i; }
        });
        if (index === -1) {
          state.options.parameters.push({
            label: attribute,
            value: value,
          });
        } else {
          state.options.parameters[index] = {
            label: attribute,
            value: value,
          }
        }
        this.setState(state);
      }.bind(this);

      var index = -1;
      var state = this.state;
      this.state.options.parameters.map(function (currentParameter,i) {
        if (currentParameter.label === parameter.name) { index = i; }
      });

      var value = "";
      if (index != -1) {
        value = this.state.options.parameters[index].value;
      }

      if (parameter.type === "date") {
        return (
          <div
            key={parameter.name}
            className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={parameter.label} />
            <Input
              type="text"
              attribute={parameter.name}
              value={value}
              onChange={handleChange_Parameter} />
          </div>
        )
      } else if (parameter.type === "select") {
        return (
          <div
            key={parameter.name}
            className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={parameter.label} />
            <Select
              attribute={parameter.name}
              value={value}
              options={parameter.options}
              onChange={handleChange_Parameter} />
          </div>
        )
      }
    }.bind(this));
  },

  getReportObject: function () {
    if (!this.state.options.report) {
      return (
        <p>Please select a report</p>
      )
    }

    if (!this.state.options.churchId) {
      return (
        <p>Please select a church</p>
      )
    }

    if (this.state.options.go !== true) {
      return (
        <p>Please click go to run the report.</p>
      )
    }

    $("#report-viewer-wait").fadeIn("slow").delay(6000).fadeOut("slow");

    return (
      <object
        id={"report-viewer-" + this.state.options.report}
        style={{height:"8.5in"}}
        data={this.getReportPath()}
        type="application/pdf"
        width="100%"
        height="100%">
        <p>
          {"Click "}
          <a href={this.getReportPath()}>here</a>
          {" to view the report."}
        </p>
      </object>
    )
  },

  getReportPath: function () {
    var reportPath = "/exports/"
      + this.state.options.report
      + "/" + this.state.options.churchId;

    this.state.options.parameters.map(function (parameter,i) {
      if (i === 0) {
        reportPath = reportPath
          + "?" + parameter.label
          + "=" + parameter.value;
      } else {
        reportPath = reportPath
          + "&" + parameter.label
          + "=" + parameter.value;
      }
    });

    return reportPath;
  },

  getGoButton: function () {
    if (this.state.options.go !== true) {
      return (
        <div
          className="col-xs-12"
          style={{marginTop:"15px"}}>
          <ButtonPrimary
            label={"Go"}
            onClick={this.handleClick_Go} />
        </div>
      )
    }
  },

  getReportOptions: function () {
    var result = [];
    Reports.map(function (report) {
      result.push({
        label: report.label,
        value: report.path,
      });
    });
    return result;
  },

  getChurchOptions: function () {
    var result = [];
    this.state.data.churches.map(function (church) {
      result.push({
        label: church.name,
        value: church._id,
      });
    });
    return result;
  },

  handleChange_Report: function (value) {
    var state = this.state;
    var churchId = this.state.options.churchId;
    state.options.go = false;
    state.options.report = value;
    this.setState(state);
  },

  handleChange_Church: function (value) {
    var state = this.state;
    state.options.go = false;
    state.options.churchId = value;
    this.setState(state);
  },

  handleClick_Go: function () {
    var state = this.state;
    state.options.go = true;
    this.setState(state);
  },
});

module.exports = Component;
