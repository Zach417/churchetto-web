var React = require('react');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Churches = require('./Index.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
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
        churches: docs,
        isLoading: false,
      });
    }.bind(this));
  },

  componentDidMount: function() {
    window.scrollTo(0, 0);
    ChurchStore.addChangeListener(this.handleChange_ChurchStore);
  },

  componentWillUnmount: function() {
    ChurchStore.removeChangeListener(this.handleChange_ChurchStore);
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
          <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
            <Church id={this.state.churches[0]._id} />
          </div>
  				<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
            <div style={Style.componentContainer}>
              <div className="row-fluid">
                <div className="col-lg-12 col-md-12 col-sm-6 col-xs-12" style={{padding:"0"}}>
                  <h1 style={{margin:"5px 0"}}>Did you know?</h1>
                  <p style={{fontSize:"16px"}}>
                    You can manage multiple churches on Churchetto.
                    If you oversee different, unique organizations or
                    you are interested about organizing your ideas for
                    building a church in the future, you can do it here!
                  </p>
                  <ButtonPrimary label={"Create a new church"} onClick={this.handleClick_AddChurch} />
                </div>
              </div>
            </div>
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
      browserHistory.push("/church/create");
    }
  },

  handleChange_ChurchStore: function () {
    this.setState(this.getInitialState());
    this.componentWillMount();
  },

  handleClick_AddChurch: function () {
    browserHistory.push("/church/create");
  },
});

module.exports = Page;
