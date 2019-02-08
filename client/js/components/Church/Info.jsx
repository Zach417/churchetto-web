var React = require('react');
var Style = require('./Style.jsx');
var Input = require('../Form/Index.jsx').Input;
var Label = require('../Form/Index.jsx').Label;
var TextArea = require('../Form/Index.jsx').TextArea;

var Info = React.createClass({
  render: function () {
    if (!this.props.church) {
      return (
        <div>Loading...</div>
      )
    }
    return (
      <div className="container-fluid" style={Style.sectionContainer}>
        <div className="row-fluid">
          <h3 style={{margin:"0"}}>Info</h3>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={true} label={"Name"} />
            <Input
              type={"text"}
              attribute={"name"}
              value={this.props.church.name}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Website"} />
            <Input
              type={"text"}
              attribute={"website"}
              value={this.props.church.website}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Mission Statement"} />
            <TextArea
              attribute={"missionStatement"}
              value={this.props.church.missionStatement}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Vision Statement"} />
            <TextArea
              attribute={"visionStatement"}
              value={this.props.church.visionStatement}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
            style={{marginTop:"20px"}} />
        </div>
        <div className="row-fluid">
          <h3 style={{margin:"0"}}>Contact</h3>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Main Phone"} />
            <Input
              type={"text"}
              attribute={"main"}
              value={this.props.church.phone.main}
              onChange={this.handleChange_AttributePhone} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Main Fax"} />
            <Input
              type={"text"}
              attribute={"main"}
              value={this.props.church.fax.main}
              onChange={this.handleChange_AttributeFax} />
          </div>
        </div>
        <div className="row-fluid">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
            style={{marginTop:"20px"}} />
        </div>
        <div className="row-fluid">
          <h3 style={{margin:"0"}}>Main Address</h3>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Address Line 1"} />
            <Input
              type={"text"}
              attribute={"line1"}
              value={this.props.church.address.line1}
              onChange={this.handleChange_AttributeAddress} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Address Line 2"} />
            <Input
              type={"text"}
              attribute={"line2"}
              value={this.props.church.address.line2}
              onChange={this.handleChange_AttributeAddress} />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"City"} />
            <Input
              type={"text"}
              attribute={"city"}
              value={this.props.church.address.city}
              onChange={this.handleChange_AttributeAddress} />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"State"} />
            <Input
              type={"text"}
              attribute={"state"}
              value={this.props.church.address.state}
              onChange={this.handleChange_AttributeAddress} />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Zip Code"} />
            <Input
              type={"text"}
              attribute={"zip"}
              value={this.props.church.address.zip}
              onChange={this.handleChange_AttributeAddress} />
          </div>
        </div>
      </div>
    )
  },

  handleChange_Attribute: function (attribute, value) {
    var church = this.props.church;
    church[attribute] = value;
    this.props.onChange(church);
  },

  handleChange_AttributePhone: function (attribute, value) {
    var church = this.props.church;
    church.phone[attribute] = value;
    this.props.onChange(church);
  },

  handleChange_AttributeFax: function (attribute, value) {
    var church = this.props.church;
    church.fax[attribute] = value;
    this.props.onChange(church);
  },

  handleChange_AttributeAddress: function (attribute, value) {
    var church = this.props.church;
    church.address[attribute] = value;
    this.props.onChange(church);
  },
});

module.exports = Info;
