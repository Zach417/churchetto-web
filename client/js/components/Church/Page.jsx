var React = require('react');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Church = require('./Index.jsx');
var BackButton = require('./Back.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ChurchStore = require('../../stores/ChurchStore');

function resolveSubDocuments (church) {
  if (!church.phone) { church.phone = {} }
  if (!church.fax) { church.fax = {} }
  if (!church.address) { church.address = {} }
  if (!church.members) { church.members = [] }
  if (!church.campuses) { church.campuses = [] }
  return church;
}

var Page = React.createClass({
  getInitialState: function () {
    return {
      church: {}
    }
  },

  componentWillMount: function () {
    if (this.props.params && this.props.params.id) {
      ChurchStore.getOne(this.props.params.id, function (doc) {
        this.setState({
          church: resolveSubDocuments(doc)
        });
      }.bind(this));
    }
  },

  componentDidMount: function() {
    window.scrollTo(0, 0);
    ChurchStore.addChangeListener(this.handleChange_ChurchStore);
  },

  componentWillUnmount: function() {
    ChurchStore.removeChangeListener(this.handleChange_ChurchStore);
  },

  render: function () {
    return (
      <div style={Style.pageContainer}
        className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
        <Church
          church={this.state.church}
          children={this.props.children}
          onChange={this.handleChange_Child} />
        <div style={Style.componentContainer}>
          <h1 style={{margin:"5px 0"}}>Did you know?</h1>
          <p style={{fontSize:"16px"}}>
            {"You can add multiple churches to your churchetto "}
            {"account. Organize a small group on the side, or see "}
            {"what it would take to start a new church."}
          </p>
          <p style={{fontSize:"16px"}}>
            {"Whatever the reason, you can add another church "}
            <Link to={"/church/create"}>here</Link>.
          </p>
        </div>
      </div>
    )
  },

  handleChange_Child: function (church) {
    this.setState(church);
  },

  handleChange_ChurchStore: function () {
    if (this.props.params && this.props.params.id) {
      ChurchStore.getOne(this.props.params.id, function (doc) {
        this.setState({
          church: resolveSubDocuments(doc)
        });
      }.bind(this));
    }
  },
});

module.exports = Page;
