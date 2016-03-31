var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Churches = require('./Index.jsx');
var Church = require('../Church/Index.jsx');
var ChurchStore = require('../../stores/ChurchStore');

var Page = React.createClass({
  getInitialState: function () {
    return {
      churches: [],
      isLoading: true,
    }
  },

  componentWillMount: function () {
    ChurchStore.get(function (docs) {
      this.setState({
        churches:docs,
        isLoading: false,
      });
    }.bind(this));
  },

  componentDidMount: function() {
    window.scrollTo(0, 0);
  },

  render: function () {
    if (this.state.isLoading === true) {
      return (
        <div style={Style.pageContainer}>
    			<div className="row-fluid" style={Style.jumbotron} onClick={this.handleClick_AddChurch}>
    				<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered"
              style={{padding:"0"}}>
              <img src="/img/wait" />
            </div>
          </div>
        </div>
      )
    } else if (this.state.churches.length === 1) {
      return (
        <div style={Style.pageContainer}>
        <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered"
          style={{display:"none"}}>
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12"
            style={{padding:"0"}}>
              <h3>Test</h3>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12"
              style={{padding:"0"}}>
              <h3>Test</h3>
            </div>
          </div>
          <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
            <Church id={this.state.churches[0]._id} />
          </div>
        </div>
      )
    } else if (this.state.churches.length > 1) {
      return (
        <div style={Style.pageContainer}
          className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
          <Churches />
        </div>
      )
    } else {
      return (
        <div style={Style.pageContainer}
          className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
    			<div className="row-fluid" style={Style.jumbotron} onClick={this.handleClick_AddChurch}>
    				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-centered"
              style={{padding:"0"}}>
    					<h1 style={{margin:"0"}}>You don't have a church family!</h1>
    					<h2 style={{margin:"0"}}>Click here to add a church</h2>
    				</div>
    			</div>
        </div>
      )
    }
  },

  handleClick_AddChurch: function () {
    browserHistory.push("/church/add");
  }
});

module.exports = Page;
