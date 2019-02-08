var React = require('react');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Church = require('./Index.jsx');
var BackButton = require('./Back.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ChurchStore = require('../../stores/ChurchStore');
var TipJar = require('../TipJar/Index.jsx');
var LatestUpdates = require('../LatestUpdates/Index.jsx');

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
        <div style={Style.componentContainer}>
          <Link to="/">{"< Back to dashboard"}</Link>
        </div>
        <Church
          church={this.state.church}
          children={this.props.children}
          onChange={this.handleChange_Child} />
        <div className="container-fluid" style={{marginTop:"20px",marginBottom:"20px",padding:"0"}}>
          <div className="row">
            <div className="col-md-6 col-xs-12">
              <div style={{
                backgroundColor: "#f4f4f4",
                position: "relative",
                border: "3px solid #ccc",
                borderRadius: "3px",
                overflow: "hidden",
                padding: "20px",
              }}>
                <h1 style={{margin:"5px 0"}}>Missing something?</h1>
                <p style={{fontSize:"16px"}}>
                  {"Churchetto is committed to making a fantastic "}
                  {"organizational tool for churches. "}
                  {"If there is something missing that you need, "}
                  {"email me at zach@churchetto.com, and I'll add it to "}
                  {"the app!"}
                </p>
              </div>
              <div style={{marginTop:"15px"}} />
              <LatestUpdates />
            </div>
            <div className="col-md-6 col-xs-12">
              <TipJar />
            </div>
          </div>
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
