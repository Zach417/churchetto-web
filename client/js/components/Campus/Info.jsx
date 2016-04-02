var React = require('react');
var Style = require('./Style.jsx');
var Input = require('../Form/Index.jsx').Input;
var Label = require('../Form/Index.jsx').Label;
var TextArea = require('../Form/Index.jsx').TextArea;
var Select = require('../Form/Index.jsx').Select;

var Info = React.createClass({
  componentWillMount: function () {
    this.campus = this.props.campus;
  },

  render: function () {
    return (
      <div className="container-fluid" style={Style.sectionContainer}>
        <div className="row-fluid">
          <h3 style={{margin:"0"}}>Info</h3>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={true} label={"Name"} />
            <Input
              type={"text"}
              value={this.props.campus.name}
              onChange={this.handleChange_Name} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={true} label={"Website"} />
            <Input
              type={"text"}
              value={this.props.campus.website}
              onChange={this.handleChange_Website} />
          </div>
        </div>
      </div>
    )
  },

  handleChange_Name: function (event) {
    this.campus.name = event.target.value;
    this.props.onChange(this.campus);
  },

  handleChange_Website: function (event) {
    this.campus.website = event.target.value;
    this.props.onChange(this.campus);
  },
});
module.exports = Info;
