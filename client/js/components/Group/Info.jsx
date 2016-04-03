var React = require('react');
var moment = require('moment');
var Style = require('./Style.jsx');
var Input = require('../Form/Index.jsx').Input;
var Label = require('../Form/Index.jsx').Label;
var TextArea = require('../Form/Index.jsx').TextArea;
var Select = require('../Form/Index.jsx').Select;

var Info = React.createClass({
  componentWillMount: function () {
    this.group = this.props.group;
  },

  render: function () {
    return (
      <div className="container-fluid" style={Style.sectionContainer}>
        <div className="row-fluid">
          <h3 style={{margin:"0"}}>The Basics</h3>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={true} label={"Name"} />
            <Input
              type={"text"}
              value={this.props.group.name}
              onChange={this.handleChange_Name} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Description"} />
            <Input
              type={"text"}
              value={this.props.group.description}
              onChange={this.handleChange_Description} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Type"} />
            <Select
              type={"text"}
              value={this.props.group.type}
              options={["Small Group","Youth Group","Other"]}
              onChange={this.handleChange_Type} />
          </div>
        </div>
      </div>
    )
  },

  handleChange_Name: function (group) {
    this.group.name = group.target.value;
    this.props.onChange(this.group);
  },

  handleChange_Description: function (group) {
    this.group.description = group.target.value;
    this.props.onChange(this.group);
  },

  handleChange_Type: function (group) {
    this.group.type = group.target.value;
    this.props.onChange(this.group);
  },
});
module.exports = Info;
