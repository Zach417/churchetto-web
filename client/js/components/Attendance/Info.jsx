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
              attribute={"date"}
              value={this.props.attendance.date}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={true} label={"Count"} />
            <Input
              type={"text"}
              attribute={"count"}
              value={this.props.attendance.count}
              onChange={this.handleChange_Attribute} />
          </div>
        </div>
      </div>
    )
  },

  handleChange_Attribute: function (attribute, value) {
    var attendance = this.props.attendance;
    attendance[attribute] = value;
    this.props.onChange(attendance);
  },
});
module.exports = Info;
