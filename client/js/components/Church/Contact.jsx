var React = require('react');
var Style = require('./Style.jsx');
var Input = require('../Form/Index.jsx').Input;
var Label = require('../Form/Index.jsx').Label;
var TextArea = require('../Form/Index.jsx').TextArea;
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var ChurchStore = require('../../stores/ChurchStore');
var ChurchActions = require('../../actions/ChurchActions');

function resolveSubDocuments (church) {
  if (!church.phone) { church.phone = {} }
  if (!church.fax) { church.fax = {} }
  if (!church.address) { church.address = {} }
  if (!church.members) { church.members = [] }
  if (!church.campuses) { church.campuses = [] }
  return church;
}

var Contact = React.createClass({
  getInitialState: function () {
    return {
      church: resolveSubDocuments({})
    }
  },

  componentWillMount: function () {
    ChurchStore.getOne(this.props.params.id, function (doc) {
      this.church = resolveSubDocuments(doc);
      this.setState({
        church: this.church
      })
    }.bind(this))
  },

  componentWillUnmount: function () {
    ChurchActions.update(this.state.church);
  },

  render: function () {
    return (
      <div className="container-fluid" style={Style.sectionContainer}>
        <div className="row-fluid">
          <h3 style={{margin:"0"}}>Contact</h3>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Main Phone"} />
            <Input
              type={"text"}
              value={this.state.church.phone.main}
              onChange={this.handleChange_PhoneMain} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Main Fax"} />
            <Input
              type={"text"}
              value={this.state.church.fax.main}
              onChange={this.handleChange_FaxMain} />
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
              value={this.state.church.address.line1}
              onChange={this.handleChange_AddressLine1} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Address Line 2"} />
            <Input
              type={"text"}
              value={this.state.church.address.line2}
              onChange={this.handleChange_AddressLine2} />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"City"} />
            <Input
              type={"text"}
              value={this.state.church.address.city}
              onChange={this.handleChange_AddressCity} />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"State"} />
            <Input
              type={"text"}
              value={this.state.church.address.state}
              onChange={this.handleChange_AddressState} />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Zip Code"} />
            <Input
              type={"text"}
              value={this.state.church.address.zip}
              onChange={this.handleChange_AddressZip} />
          </div>
        </div>
        <div className="row-fluid">
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <ButtonPrimary label={"Save"} onClick={this.handleClick_Submit} />
            <span style={{display:"inline-block",width:"5px"}} />
            <ButtonSecondary label={"Cancel"} onClick={this.handleClick_Cancel} />
          </div>
        </div>
      </div>
    )
  },

  handleChange_PhoneMain: function (event) {
    this.church.phone.main = event.target.value;
    this.setState({church:this.church});
  },

  handleChange_FaxMain: function (event) {
    this.church.fax.main = event.target.value;
    this.setState({church:this.church});
  },

  handleChange_AddressLine1: function (event) {
    this.church.address.line1 = event.target.value;
    this.setState({church:this.church});
  },

  handleChange_AddressLine2: function (event) {
    this.church.address.line2 = event.target.value;
    this.setState({church:this.church});
  },

  handleChange_AddressCity: function (event) {
    this.church.address.city = event.target.value;
    this.setState({church:this.church});
  },

  handleChange_AddressState: function (event) {
    this.church.address.state = event.target.value;
    this.setState({church:this.church});
  },

  handleChange_AddressZip: function (event) {
    this.church.address.zip = event.target.value;
    this.setState({church:this.church});
  },

  handleClick_Submit: function () {
    ChurchActions.update(this.state.church);
  },

  handleClick_Cancel: function () {
    ChurchStore.getOne(this.props.params.id, function (doc) {
      this.church = resolveSubDocuments(doc);
      this.setState({
        church: this.church
      })
    }.bind(this))
  },
});

module.exports = Contact;
