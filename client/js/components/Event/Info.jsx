var React = require('react');
var moment = require('moment');
var Style = require('./Style.jsx');
var Input = require('../Form/Index.jsx').Input;
var Label = require('../Form/Index.jsx').Label;
var TextArea = require('../Form/Index.jsx').TextArea;
var Select = require('../Form/Index.jsx').Select;

var Info = React.createClass({
  componentWillMount: function () {
    this.event = this.props.event;
    if (this.event.starts) {
      this.event.starts = moment(this.event.starts).format('MM/DD/YYYY h:mm a');
    }
    if (this.event.ends) {
      this.event.ends = moment(this.event.ends).format('MM/DD/YYYY h:mm a');
    }
  },

  render: function () {
    return (
      <div className="container-fluid" style={Style.sectionContainer}>
        <div className="row-fluid">
          <h3 style={{margin:"0"}}>The Basics</h3>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={true} label={"Name"} />
            <Input
              type={"text"}
              value={this.props.event.name}
              onChange={this.handleChange_Name} />
          </div>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Description"} />
            <Input
              type={"text"}
              value={this.props.event.description}
              onChange={this.handleChange_Description} />
          </div>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Start Time"} />
            <Input
              type={"text"}
              value={this.props.event.starts}
              onChange={this.handleChange_Starts} />
          </div>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"End Time"} />
            <Input
              type={"text"}
              value={this.props.event.ends}
              onChange={this.handleChange_Ends} />
          </div>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Group"} />
            <Select
              type={"text"}
              value={this.props.event.group}
              options={this.getGroupOptions()}
              onChange={this.handleChange_Group} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Status"} />
            <Select
              type={"text"}
              value={this.props.event.status}
              options={["Pending","Completed","Canceled"]}
              onChange={this.handleChange_Status} />
          </div>
          <div className="col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Notes"} />
            <TextArea
              type={"text"}
              value={this.props.event.notes}
              onChange={this.handleChange_Notes} />
          </div>
        </div>
      </div>
    )
  },

  getGroupOptions: function () {
    var result = [];
    for (var i = 0; i < this.props.church.groups.length; i++) {
      result.push({
        value: this.props.church.groups[i]._id,
        label: this.props.church.groups[i].name,
      });
    }
    return result;
  },

  handleChange_Name: function (event) {
    this.event.name = event.target.value;
    this.props.onChange(this.event);
  },

  handleChange_Description: function (event) {
    this.event.description = event.target.value;
    this.props.onChange(this.event);
  },

  handleChange_Starts: function (event) {
    this.event.starts = event.target.value;
    this.props.onChange(this.event);
  },

  handleChange_Ends: function (event) {
    this.event.ends = event.target.value;
    this.props.onChange(this.event);
  },

  handleChange_Notes: function (event) {
    this.event.notes = event.target.value;
    this.props.onChange(this.event);
  },

  handleChange_Group: function (event) {
    this.event.group = event.target.value;
    this.props.onChange(this.event);
  },

  handleChange_Status: function (event) {
    this.event.status = event.target.value;
    this.props.onChange(this.event);
  },
});
module.exports = Info;
