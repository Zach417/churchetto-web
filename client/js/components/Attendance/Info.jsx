var React = require('react');
var Style = require('./Style.jsx');
var Input = require('../Form/Index.jsx').Input;
var Label = require('../Form/Index.jsx').Label;
var TextArea = require('../Form/Index.jsx').TextArea;
var Select = require('../Form/Index.jsx').Select;

var Info = React.createClass({
  componentWillMount: function () {
    this.attendance = this.props.attendance;
  },

  render: function () {
    return (
      <div className="container-fluid" style={Style.sectionContainer}>
        <div className="row-fluid">
          <h3 style={{margin:"0"}}>Info</h3>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={true} label={"Date"} />
            <Input
              type={"text"}
              value={this.props.attendance.date}
              onChange={this.handleChange_Date} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={true} label={"Count"} />
            <Input
              type={"text"}
              value={this.props.attendance.count}
              onChange={this.handleChange_Count} />
          </div>
        </div>
      </div>
    )
  },

  handleChange_Date: function (event) {
    this.attendance.date = event.target.value;
    this.props.onChange(this.attendance);
  },

  handleChange_Count: function (event) {
    this.attendance.count = event.target.value;
    this.props.onChange(this.attendance);
  },
});
module.exports = Info;
