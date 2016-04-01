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

var Info = React.createClass({
  getInitialState: function () {
    return {
      church: {}
    }
  },

  componentWillMount: function () {
    ChurchStore.getOne(this.props.params.id, function (doc) {
      this.church = doc;
      this.setState({
        church: doc
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
          <h3 style={{margin:"0"}}>Info</h3>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={true} label={"Name"} />
            <Input
              type={"text"}
              value={this.state.church.name}
              onChange={this.handleChange_Name} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Website"} />
            <Input
              type={"text"}
              value={this.state.church.website}
              onChange={this.handleChange_Website} />
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Mission Statement"} />
            <TextArea
              value={this.state.church.missionStatement}
              onChange={this.handleChange_MissionStatement} />
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Label isRequired={false} label={"Vision Statement"} />
            <TextArea
              value={this.state.church.visionStatement}
              onChange={this.handleChange_VisionStatement} />
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

  handleChange_Name: function (event) {
    this.church.name = event.target.value;
    this.setState({church:this.church});
  },

  handleChange_Website: function (event) {
    this.church.website = event.target.value;
    this.setState({church:this.church});
  },

  handleChange_MissionStatement: function (event) {
    this.church.missionStatement = event.target.value;
    this.setState({church:this.church});
  },

  handleChange_VisionStatement: function (event) {
    this.church.visionStatement = event.target.value;
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
      });
    }.bind(this))
  },
});

module.exports = Info;
