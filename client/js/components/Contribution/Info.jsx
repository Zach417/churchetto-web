var React = require('react');
var Style = require('./Style.jsx');
var Form = require('../Form/Index.jsx');
var Input = require('../Form/Index.jsx').Input;
var Label = require('../Form/Index.jsx').Label;
var TextArea = require('../Form/Index.jsx').TextArea;
var Select = require('../Form/Index.jsx').Select;
var Autocomplete = require('../Form/Index.jsx').Autocomplete;

var Info = React.createClass({
  componentWillMount: function () {
    this.church = this.props.church;
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
              attribute={"memberId"}
              value={this.props.contribution.memberId}
              options={this.getMemberOptions()}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={true} label={"Date"} />
            <Form.DatePicker
              attribute={"date"}
              value={this.props.contribution.date}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={true} label={"Amount"} />
            <Input
              type={"text"}
              attribute={"amount"}
              value={this.props.contribution.amount}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Description"} />
            <Autocomplete
              options={this.getDescriptionOptions()}
              attribute={"description"}
              value={this.props.contribution.description}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Is Tax Deductible"} />
            <Select
              options={["true","false"]}
              attribute={"isTaxDeductible"}
              value={this.props.contribution.isTaxDeductible}
              onChange={this.handleChange_Attribute} />
          </div>
        </div>
      </div>
    )
  },

  getMemberOptions: function () {
    var result = []
    if (!this.props.church || !this.props.church.members) {
      return result;
    }
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

  getDescriptionOptions: function () {
    var result = [];
    if (!this.church || !this.church.contributions) {
      return result;
    }
    this.church.contributions.map(function (contribution) {
      if (contribution.description) {
        result.push(contribution.description);
      }
    });
    return result;
  },

  handleChange_Attribute: function (attribute, value) {
    var contribution = this.props.contribution;
    contribution[attribute] = value;
    this.props.onChange(contribution);
  },
});
module.exports = Info;
