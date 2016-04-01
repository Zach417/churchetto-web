var React = require('react');
var Style = require('./Style.jsx');
var Input = require('../Form/Index.jsx').Input;
var Label = require('../Form/Index.jsx').Label;
var TextArea = require('../Form/Index.jsx').TextArea;

var Info = React.createClass({
  componentWillMount: function () {
    this.church = this.props.church;
  },

  render: function () {
    if (!this.props.church) { return (<div/>) }
    return (
      <div className="container-fluid" style={Style.sectionContainer}>
        <div className="row-fluid">
          <h3 style={{margin:"0"}}>Info</h3>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={true} label={"Name"} />
            <Input
              type={"text"}
              value={this.props.church.name}
              onChange={this.handleChange_Name} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Website"} />
            <Input
              type={"text"}
              value={this.props.church.website}
              onChange={this.handleChange_Website} />
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Mission Statement"} />
            <TextArea
              value={this.props.church.missionStatement}
              onChange={this.handleChange_MissionStatement} />
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Vision Statement"} />
            <TextArea
              value={this.props.church.visionStatement}
              onChange={this.handleChange_VisionStatement} />
          </div>
        </div>
      </div>
    )
  },

  handleChange_Name: function (event) {
    this.church.name = event.target.value;
    this.props.onChange(this.church);
  },

  handleChange_Website: function (event) {
    this.church.website = event.target.value;
    this.props.onChange(this.church);
  },

  handleChange_MissionStatement: function (event) {
    this.church.missionStatement = event.target.value;
    this.props.onChange(this.church);
  },

  handleChange_VisionStatement: function (event) {
    this.church.visionStatement = event.target.value;
    this.props.onChange(this.church);
  },
});

module.exports = Info;
