var React = require('react');
var moment = require('moment');
var Style = require('./Style.jsx');
var Volunteers = require('./Volunteers.jsx');
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
            <Label isRequired={true} label={"Event Name"} />
            <Input
              type={"text"}
              attribute={"name"}
              value={this.props.event.name}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label label={"Contact Name"} />
            <Input
              type={"text"}
              attribute={"contact"}
              value={this.props.event.contact}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label label={"Event Start Time" + this.getStartsWeekday()} />
            <Input
              type={"text"}
              attribute={"starts"}
              value={this.props.event.starts}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label label={"Event End Time" + this.getEndsWeekday()} />
            <Input
              type={"text"}
              attribute={"ends"}
              value={this.props.event.ends}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label label={"Group"} />
            <Select
              attribute={"group"}
              value={this.props.event.group}
              options={this.getGroupOptions()}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label label={"Event Description"} />
            <Input
              type={"text"}
              attribute={"description"}
              value={this.props.event.description}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-xs-12"
            style={Style.detailColumn}>
            <Label label={"Status"} />
            <Select
              attribute={"status"}
              value={this.props.event.status}
              options={["Pending","Completed","Canceled"]}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-xs-12"
            style={Style.detailColumn}>
            <Label label={"Notes"} />
            <TextArea
              type={"text"}
              attribute={"notes"}
              value={this.props.event.notes}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-xs-12" style={{marginTop:"10px"}} />
        </div>
        <div className="row-fluid">
          <h3 style={{margin:"0"}}>Location and Rentals</h3>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label label={"Rental Start Time"} />
            <Input
              type={"text"}
              attribute={"locationStarts"}
              value={this.props.event.locationStarts}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-md-6 col-xs-12"
            style={Style.detailColumn}>
            <Label label={"Rental End Time"} />
            <Input
              type={"text"}
              attribute={"locationEnds"}
              value={this.props.event.locationEnds}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-xs-12"
            style={Style.detailColumn}>
            <Label label={"Rental Rooms"} />
            <TextArea
              type={"text"}
              attribute={"locationNotes"}
              value={this.props.event.locationNotes}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-xs-12" style={{marginTop:"10px"}} />
        </div>
        <div className="row-fluid" style={{display:"inline-block",width:"100%"}}>
          <Volunteers
            event={this.props.event}
            church={this.props.church}
            onChange={this.props.onChange} />
        </div>
      </div>
    )
  },

  getStartsWeekday: function () {
    if (this.props.event.starts && moment(this.props.event.starts).isValid()) {
      return " (" + moment(this.props.event.starts).format('dddd') + ")";
    }
    return "";
  },

  getEndsWeekday: function () {
    if (this.props.event.ends && moment(this.props.event.ends).isValid()) {
      return " (" + moment(this.props.event.ends).format('dddd') + ")";
    }
    return "";
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
