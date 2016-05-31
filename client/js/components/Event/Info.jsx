var React = require('react');
var Style = require('./Style.jsx');
var Input = require('../Form/Index.jsx').Input;
var Label = require('../Form/Index.jsx').Label;
var TextArea = require('../Form/Index.jsx').TextArea;
var Select = require('../Form/Index.jsx').Select;

var Info = React.createClass({
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
              attribute={"name"}
              value={this.props.event.name}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Description"} />
            <Input
              type={"text"}
              attribute={"description"}
              value={this.props.event.description}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Start Time"} />
            <Input
              type={"text"}
              attribute={"starts"}
              value={this.props.event.starts}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"End Time"} />
            <Input
              type={"text"}
              attribute={"ends"}
              value={this.props.event.ends}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Group"} />
            <Select
              attribute={"group"}
              value={this.props.event.group}
              options={this.getGroupOptions()}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Status"} />
            <Select
              attribute={"status"}
              value={this.props.event.status}
              options={["Pending","Completed","Canceled"]}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Notes"} />
            <TextArea
              type={"text"}
              attribute={"notes"}
              value={this.props.event.notes}
              onChange={this.handleChange_Attribute} />
          </div>
        </div>
      </div>
    )
  },

  getGroupOptions: function () {
    if (!this.props.church.groups) { return []; }
    var result = [];
    for (var i = 0; i < this.props.church.groups.length; i++) {
      result.push({
        value: this.props.church.groups[i]._id,
        label: this.props.church.groups[i].name,
      });
    }
    return result;
  },

  handleChange_Attribute: function (attribute, value) {
    var event = this.props.event;
    event[attribute] = value;
    this.props.onChange(event);
  },
});
module.exports = Info;
