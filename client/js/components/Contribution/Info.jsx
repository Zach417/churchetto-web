var React = require('react');
var Style = require('./Style.jsx');
var Input = require('../Form/Index.jsx').Input;
var Label = require('../Form/Index.jsx').Label;
var TextArea = require('../Form/Index.jsx').TextArea;
var Select = require('../Form/Index.jsx').Select;

var Info = React.createClass({
  componentWillMount: function () {
    this.contribution = this.props.contribution;
  },

  render: function () {
    return (
      <div className="container-fluid" style={Style.sectionContainer}>
        <div className="row-fluid">
          <h3 style={{margin:"0"}}>Info</h3>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={true} label={"Member"} />
            <Select
              type={"text"}
              value={this.props.contribution.memberId}
              options={this.getMemberOptions()}
              onChange={this.handleChange_Member} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={true} label={"Date"} />
            <Input
              type={"text"}
              value={this.props.contribution.date}
              onChange={this.handleChange_Date} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={true} label={"Amount"} />
            <Input
              type={"text"}
              value={this.props.contribution.amount}
              onChange={this.handleChange_Amount} />
          </div>
        </div>
      </div>
    )
  },

  getMemberOptions: function () {
    var result = []
    for (var i = 0; i < this.props.church.members.length; i++) {
      result.push({
        value: this.props.church.members[i]._id,
        label: this.props.church.members[i].lastName + ", " + this.props.church.members[i].firstName,
      })
    }
    return result.sort(function(a, b) {
      var textA = a.label.toUpperCase();
      var textB = b.label.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  },

  handleChange_Member: function (event) {
    this.contribution.memberId = event.target.value;
    this.props.onChange(this.contribution);
  },

  handleChange_Date: function (event) {
    this.contribution.date = event.target.value;
    this.props.onChange(this.contribution);
  },

  handleChange_Amount: function (event) {
    this.contribution.amount = event.target.value;
    this.props.onChange(this.contribution);
  },
});
module.exports = Info;
