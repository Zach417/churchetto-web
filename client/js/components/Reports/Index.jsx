var React = require('react');
var browserHistory = require('react-router').browserHistory;
var $ = require('jquery');
var moment = require('moment');
var Style = require('./Style.jsx');
var Reports = require('./Reports.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var Form = require ('../Form/Index.jsx');
var Label = require ('../Form/Index.jsx').Label;
var Input = require ('../Form/Index.jsx').Input;
var Select = require ('../Form/Index.jsx').Select;
var ChurchStore = require('../../stores/ChurchStore');

function stringToBoolean (string) {
  switch(string.toLowerCase().trim()) {
    case "true": case "yes": case "1": return true;
    case "false": case "no": case "0": case null: return false;
    default: return Boolean(string);
  }
}

function parametersSet(template) {
  var result = true;
  template.parameters.map(function (p) {
    if (!p.value && p.isRequired == true) {
      result = false;
    }
  });
  return result;
};

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

function formatMoney(n, c, d, t) {
  var c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;

  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

var Component = React.createClass({
  getInitialState: function () {
    return {
      data: {
        churches: [],
        reports: Reports,
      },
      error: '',
      edit: false,
      selectedReport: '',
      reportTemp: '',
      report: '',
    }
  },

  componentWillMount: function () {
    ChurchStore.get(function (churches) {
      var state = this.state;
      state.data.churches = churches;
      this.setState(state)
    }.bind(this));
  },

  componentDidMount: function () {
    if (this.props.id) {
      var state = this.state;
      this.state.data.reports.map(function (r) {
        if (r.path == this.props.id) {
          state.report = r;
          state.selectedReport = r.path;
        }
      }.bind(this));

      if (state.report && state.report.parameters) {
        state.report.parameters.map(function (p, i) {
          var qValue = getParameterByName(p.name);
          if (qValue) {
            state.report.parameters[i].value = qValue;
          }
        })
      }

      var qValue = getParameterByName("go");
      if (qValue == "true") {
        var err = '';
        state.report.parameters.map(function (p) {
          if (!p.value && p.isRequired == true) {
            err += p.label + " is a required field. ";
          }
        });
        if (err) {
          state.go = false;
          state.error = err;
        } else {
          state.go = true;
        }
      }

      this.setState(state);
    }
  },

  render: function () {
    return (
      <div className="container" style={{minHeight: "calc(100% - 65px)"}}>
        <div
          style={{
            backgroundColor: "#f4f4f4",
            padding: "15px",
            border: "1px solid #ccc",
            marginTop: "15px",
            marginBottom: "15px"
          }}
          className="row">
          <h3 style={{margin:"5px 0px"}}>Report Viewer</h3>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={true} label={"Report"} />
            <Select
              value={this.state.selectedReport}
              options={this.getReportOptions()}
              onChange={this.handleChange_Report} />
          </div>
          {this.getParameterOptions()}
          {this.getButtons()}
        </div>
        {this.getReportEdit()}
        {this.getError()}
        {this.getReport()}
      </div>
    )
  },

  getError: function () {
    if (this.state.error) {
      return (
        <div
          style={{
            backgroundColor: "#f4f4f4",
            padding: "15px",
            border: "1px solid #ccc",
            marginTop: "15px",
            marginBottom: "15px"
          }}
          className="row">
          <p style={{color:"red"}}>
            {"Error: " + this.state.error}
          </p>
        </div>
      )
    }
  },

  getReportEdit: function () {
    if (this.state.edit) {
      return (
        <div
          style={{
            backgroundColor: "#f4f4f4",
            padding: "15px",
            border: "1px solid #ccc",
            marginTop: "15px",
            marginBottom: "15px"
          }}
          className="row">
          <h3 style={{margin:"5px 0px"}}>Edit Report</h3>
          <p>
            This is the data object that is used to generate the selected report. It is a JSON object and must be parsed as such. There is no documentation for this at the moment, but you are free to play around in the mean time.
          </p>
          <div className="col-xs-12"
            style={Style.detailColumn}>
            <Form.TextArea
              value={this.state.reportTemp}
              onChange={this.handleChange_EditReport} />
          </div>
          <div
            className="col-xs-12"
            style={{marginTop:"15px"}}>
            <ButtonPrimary
              label={"Update Report"}
              onClick={this.handleClick_UpdateReport} />
            <span style={{marginLeft:"15px"}} />
            <ButtonSecondary
              label={"Hide"}
              onClick={this.handleClick_EditReport} />
          </div>
        </div>
      )
    }
  },

  getReportOptions: function () {
    var result = [];
    this.state.data.reports.map(function (report) {
      result.push({
        label: report.label,
        value: report.path,
      });
    });
    return result;
  },

  getReport: function () {
    if (!this.state.go) return;
    if (!this.state.report) return;
    if (!parametersSet(this.state.report)) return;

    var style = {
      fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif'
    }

    if (this.state.report.template.style) {
      style = this.state.report.template.style;
    }

    return (
      <div id="report" className="row"
        style={{
          backgroundColor: "white",
          border: "3px solid black",
          marginTop: "15px",
          marginBottom: "15px",
        }}>
        <div className="col-xs-12" style={{marginTop:"15px"}}>
          <div style={{all:"initial"}}>
            <div style={style}>
            {this.getReportHeader()}
            {this.getReportBodyFromTemplate()}
            {this.getReportFooter()}
            </div>
          </div>
        </div>
      </div>
    )
  },

  getReportHeader: function () {
    var html = this.state.report.template.reportHeader;
    return (
      <div dangerouslySetInnerHTML={{__html:html}} />
    )
  },

  getReportFooter: function () {
    var html = this.state.report.template.reportFooter;
    return (
      <div dangerouslySetInnerHTML={{__html:html}} />
    )
  },

  getReportBodyFromTemplate: function () {
    var bodyHtml = '';
    var parameters = this.state.report.parameters;
    var template = this.state.report.template;

    var parent = '';
    if (template.parent.startsWith("p::")) {
      var parentParamName = template.parent.replace("p::", "");
      parameters.map(function (param) {
        if (parentParamName == param.name) {
          if (param.options.type == "query") {
            var dataSource = this.state.data[param.options.from];
            for (var i = 0; i < dataSource.length; i++) {
              if (dataSource[i]._id == param.value) {
                parent = dataSource[i];
              }
            }
          } else {
            parent = param.value;
          }
        }
      }.bind(this));
    }

    template.sections.map(function (section, i) {
      var data = [];
      var groups = []; // { groupId: '', data: [] }

      if (section.sectionHeader) {
        bodyHtml += this.parseHtml(section.sectionHeader);
      }

      if (section.data.startsWith("parent") && parent) {
        data = parent[section.data.replace("parent.", "")];
        data = this.filterData(section.filter, data);

        groups = this.groupData(section.groupBy, data);

        if (section.groupBy) {
          groups.map(function (group, j) {
            group.parent = parent;
            for (var i = 0; i < group.data.length; i++) {
              group.data[i].parent = parent;
            }
            var html = this.parseHtml(section.repeater, group, section);
            bodyHtml = bodyHtml + html;
          }.bind(this));
        } else {
          data.map(function (doc) {
            doc.parent = parent;
            var html = this.parseHtml(section.repeater, doc);
            bodyHtml = bodyHtml + html;
          }.bind(this));
        }

      }

      if (section.sectionFooter) {
        bodyHtml += this.parseHtml(section.sectionFooter);
      }
    }.bind(this));

    return (
      <div dangerouslySetInnerHTML={{__html:bodyHtml}} />
    )
  },

  getParameterOptions: function () {
    if (!this.state.report) return;
    if (!this.state.report.parameters) return;
    return this.state.report.parameters.map(function (parameter) {
      var handleChange_Parameter = function (attribute, value) {
        var state = this.state;
        state.go = false;
        for (var i = 0; i < state.report.parameters.length; i++) {
          if (state.report.parameters[i].name == attribute) {
            state.report.parameters[i].value = value;
          }
        }
        this.setState(state);
        this.setUrl();
      }.bind(this);
      if (parameter.type === "date") {
        return (
          <div
            key={parameter.name}
            className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label
              isRequired={parameter.isRequired}
              label={parameter.label} />
            <Input
              type="text"
              attribute={parameter.name}
              value={parameter.value}
              onChange={handleChange_Parameter} />
          </div>
        )
      } else if (parameter.options) {
        var options = [];
        if (parameter.options.type == 'query') {
          if (parameter.options.from == 'churches') {
            options = [];
            this.state.data.churches.map(function (c) {
              options.push({
                label: c.name,
                value: c._id
              });
            });
          }
        } else if (parameter.options.type == "list") {
          return (
            <div
              key={parameter.name}
              className="col-md-6 col-xs-12"
              style={Style.detailColumn}>
              <Label
                isRequired={parameter.isRequired}
                label={parameter.label} />
              <Select
                attribute={parameter.name}
                value={parameter.value}
                options={parameter.options.list}
                onChange={handleChange_Parameter} />
            </div>
          )
        }

        return (
          <div
            key={parameter.name}
            className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label
              isRequired={parameter.isRequired}
              label={parameter.label} />
            <Select
              attribute={parameter.name}
              value={parameter.value}
              options={options}
              onChange={handleChange_Parameter} />
          </div>
        )
      }
    }.bind(this));
  },

  getButtons: function () {
    return (
      <div
        className="col-xs-12"
        style={{marginTop:"15px"}}>
        <ButtonPrimary
          label={"Generate"}
          onClick={this.handleClick_Go} />
        <span style={{marginLeft:"15px"}} />
        <ButtonSecondary
          label={"Print / Download"}
          onClick={this.handleClick_Download} />
        <span style={{marginLeft:"15px"}} />
        <ButtonSecondary
          label={"Edit Report"}
          onClick={this.handleClick_EditReport} />
      </div>
    )
  },

  handleChange_Report: function (value) {
    var state = this.state;
    state.go = false;
    state.selectedReport = value;
    state.edit = false;
    state.error = '';
    this.state.data.reports.map(function (r) {
      if (r.path == value) {
        state.report = r;
      }
    });
    state.report.parameters.map(function (p, i) {
      var qValue = getParameterByName(p.name);
      if (qValue) {
        state.report.parameters[i].value = qValue;
      }
    });
    state.reportTemp = JSON.stringify(state.report);
    this.setState(state);
    this.setUrl();
  },

  handleClick_Download: function () {
  	var printContents = document.getElementById("report").innerHTML;
  	var originalContents = document.body.innerHTML;

    var mywindow = window.open('', '_blank');
  	mywindow.document.body.innerHTML = printContents;
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    // wait for images to load
    var imgs = mywindow.document.images,
    len = imgs.length,
    counter = 0;

    if (len == 0) {
      mywindow.print();
    } else {
      [].forEach.call(imgs, function(img) {
          img.addEventListener('load', incrementCounter, false);
      });

      function incrementCounter () {
        counter++;
        if (counter === len) {
        	mywindow.print();
        }
      }
    }
  },

  handleChange_EditReport: function (value) {
    var state = this.state;
    state.reportTemp = value;
    this.setState(state);
  },

  handleClick_UpdateReport: function () {
    try {
      var state = this.state;
      state.report = JSON.parse(state.reportTemp);
      state.error = '';
      this.setState(state);
    } catch (ex) {
      var state = this.state;
      state.go = false;
      state.error = "Report description could not be parsed as JSON";
      this.setState(state);
    }
  },

  handleClick_EditReport: function () {
    var state = this.state;
    state.edit = !state.edit;
    state.reportTemp = JSON.stringify(state.report);
    this.setState(state);
  },

  handleClick_Go: function () {
    var err = '';
    this.state.report.parameters.map(function (p) {
      if (!p.value && p.isRequired == true) {
        err += p.label + " is a required field. ";
      }
    });
    if (err) {
      var state = this.state;
      state.go = false;
      state.error = err;
      this.setState(state);
      return;
    }

    var state = this.state;
    state.go = true;
    state.error = '';
    this.setState(state);
    this.setUrl();
  },

  groupData: function (groupBy, data) {
    if (!groupBy) return [];
    if (!data) return [];

    var groups = [];
    data.map(function (d) {
      var newGroup = true;
      groups.map(function (g) {
        if (d[groupBy] == g.groupId) {
          newGroup = false;
          g.data.push(d);
        }
      });

      if (newGroup == true) {
        groups.push({
          groupId: d[groupBy],
          data: [d],
        })
      }
    });

    return groups;
  },

  filterData: function (str, data) {
    if (!str) return data;
    if (!data) return [];

    var filters = str.split("&&");
    filters.map(function (filter) {
      var comparisonType = "";
      if (filter.includes("==")) {
        comparisonType = "==";
      } else if (filter.includes(">")) {
        comparisonType = ">";
      } else if (filter.includes("<")) {
        comparisonType = "<";
      }
      var args = filter.split(comparisonType);
      var compareValues = [];

      var isDateComparison = false;
      var isBoolComparison = false;
      var skip = false;

      args.map(function (arg, i) {
        if (arg.split("::")[0] == "param") {
          this.state.report.parameters.map(function (p) {
            if (p.name == arg.split("::")[1]) {
              if (p.type == "date") isDateComparison = true;
              if (p.type == "boolean") isBoolComparison = true;
              if (!p.value && !p.isRequired) skip = true;;
              compareValues.push(function (doc) {
                if (!p.value) return;
                if (p.type == "date") {
                  return new Date(p.value);
                } else if (p.type == "boolean") {
                  return stringToBoolean(p.value);
                } else {
                  return p.value;
                }
              }.bind(this));
            }
          }.bind(this));
        } else if (arg.split("::")[0] == "monthName") {
          var attributes = arg.split("::")[1].split(".");
          compareValues.push(function (doc) {
            var value = doc[attributes[0]];
            for (var i = 1; i < attributes.length; i++) {
              value = attribute[attributes[i]];
            }
            if (!value) return;
            return moment(value).format("MMMM");
          }.bind(this));
        } else {
          var attributes = arg.split(".");
          compareValues.push(function (doc) {
            var value = doc[attributes[0]];
            for (var i = 1; i < attributes.length; i++) {
              value = attribute[attributes[i]];
            }

            if (isDateComparison) {
              value = new Date(value);
            }

            if (isBoolComparison && typeof value == "string") {
              value = stringToBoolean(value);
            }

            return value;
          });
        }
      }.bind(this));

      if (skip == true) {
        return;
      }

      var newData = [];
      data.map(function (d) {
        var compare0 = compareValues[0](d);
        var compare1 = compareValues[1](d);

        if (comparisonType == "==") {
          if (compare0 == compare1) newData.push(d);
        } else if (comparisonType == "<") {
          if (compare0 < compare1) newData.push(d);
        } else if (comparisonType == ">") {
          if (compare0 > compare1) newData.push(d);
        }
      });
      data = newData;
    }.bind(this));

    return data;
  },

  parseHtml: function (html, doc, section) {
    return html.replace(/([\[(])(.+?)([\])])/g, function (match, p1, p2, p3, offset, string) {
      var str = p2;

      var aggregate;
      var assoc;
      var value;

      var format = this.getFormat(str);
      var attributes = this.getAttributes(str);
      var param = this.getParameter(str);

      if (doc) {
        if (doc.data) { // is group
          aggregate = this.getAggregate(str, doc, section.groupBy);
          assoc = this.getAssoc(str, doc.parent, doc.groupId);
          //console.log(doc.data[0], attributes);
          value = doc.data[0];//this.getValueFromObj(doc.data[0], attributes);
        } else {
          assoc = this.getAssoc(str, doc.parent, doc.memberId);
          value = doc;//this.getValueFromObj(doc, attributes);
        }
      }

      if (aggregate) value = aggregate(attributes);
      if (assoc) value = assoc();

      if (doc && typeof value == "object" && value != null) {
        if (doc.data) { // is group
          value = this.getValueFromObj(value, attributes);
        } else {
          value = this.getValueFromObj(value, attributes);
        }
      }

      if (param) value = param;
      if (format) value = format(value);
      if (!value) value = "";

      return value;
    }.bind(this));
  },

  getParameter: function (str) {
    if (!str.includes("param::")) return;
    str = str.split("param::").pop();
    str = str.split(",")[0];
    var param;
    this.state.report.parameters.map(function (p) {
      if (p.name == str) param = p;
    });
    if (param) {
      return param.value;
    }
  },

  getAggregate: function (str, g, groupBy) {
    if (str.split("//").length <= 1) return;
    var f = str.split("//")[0];
    if (f == "first") {
      return function (attributes) {
        return g.data[0][groupBy];
      }
    } else if (f == "min") {
      return function (attributes) {
        var value = this.getValueFromObj(g.data[0], attributes);
        for (var i = 1; i < g.data.length; i++) {
          var x = this.getValueFromObj(g.data[i], attributes);
          if (x < value) value = x;
        }
        return value;
      }.bind(this);
    } else if (f == "max") {
      return function (attributes) {
        var value = this.getValueFromObj(g.data[0], attributes);
        for (var i = 1; i < g.data.length; i++) {
          var x = this.getValueFromObj(g.data[i], attributes);
          if (x > value) value = x;
        }
        return value;
      }.bind(this);
    } else if (f == "sum") {
      return function (attributes) {
        var value = this.getValueFromObj(g.data[0], attributes);
        for (var i = 1; i < g.data.length; i++) {
          value += this.getValueFromObj(g.data[i], attributes);
        }
        return value;
      }.bind(this);
    }
  },

  getAttributes: function (str) {
    if (str.split("//").length > 1) {
      str = str.split("//")[1];
    }
    if (str.split("::").length > 0 && str.split("::")[0] == "format") {
      str = str.split(",")[1];
    }
    if (str.includes("assoc::")) {
      str = str.split("assoc::")[1].split(",")[1];
    }
    return str.split(".");
  },

  getValueFromObj: function (obj, attributes) {
    var value;
    if (attributes[0] == "parent") {
      value = obj.parent;
    } else {
      value = obj[attributes[0]];
    }
    for (var i = 1; i < attributes.length; i++) {
      if (attributes[i] == "parent") {
        value = obj.parent;
      } else {
        value = value[attributes[i]];
      }
    }
    return value;
  },

  getAssoc: function (str, parent, assocId) {
    if (!str.includes("assoc::")) return;
    str = str.split("assoc::").pop();
    var association = str.split(",")[0];
    return function () {
      var obj = '';
      parent[association].map(function (m) {
        if (m._id == assocId) obj = m;
      });
      var attributes = str.replace(association + ",", "").split(".");
      return this.getValueFromObj(obj, attributes);
    }.bind(this);
  },

  getFormat: function (str) {
    if (!str.includes("format::")) return;
    str = str.split("format::").pop();
    var type = str.split(",")[0];
    var attribute = str.split(",")[1];
    if (type == "date") {
      var dateFormat = str.split(",")[2];
      return function (value) {
        if (!value) return;
        return moment(value).format(dateFormat);
      }
    } else if (type == "money") {
      return function (value) {
        if (!value) return;
        return formatMoney(value, 2, ".", ",");
      }
    } else if (type == "string") {
      var nullReplacement = str.split(",")[2];
      return function (value) {
        if (!value) return nullReplacement;
        else return value;
      }
    } else if (type == "bool") {
      var trueReplacement = str.split(",")[2];
      var falseReplacement = str.split(",")[3];
      var nullReplacement = str.split(",")[4];
      return function (value) {
        if (value == false || value == "false") return falseReplacement;
        else if (!value) return nullReplacement;
        else return trueReplacement;
      }
    }
  },

  setUrl: function () {
    var url = '/report/' + this.state.selectedReport + '?';
    this.state.report.parameters.map(function (p) {
      if (p.value) {
        url += p.name + '=' + p.value + '&';
      }
    });

    if (this.state.go == true) {
      url += "go=true&";
    }

    url = url.slice(0, -1);

    window.history.replaceState({}, null, url);
  },
});

module.exports = Component;
