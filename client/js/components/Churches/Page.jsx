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
    ChurchStore.get(function (docs) {
      if (!docs || docs.length === 0) {
        return browserHistory.push("/church/create");
      } else if (docs.length === 1) {
        return browserHistory.push("/church/" + docs[0]._id);
      }
    })
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
          className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered" />
      )
    }
  },

  handleChange_ChurchStore: function () {
    ChurchStore.get(function (docs) {
      if (!docs || docs.length === 0) {
        return browserHistory.push("/church/create");
      } else if (docs.length === 1) {
        return browserHistory.push("/church/" + docs[0]._id);
      } else {
        this.setState({
          churches: docs,
          isLoading: false,
        });
      }
    }.bind(this))
  },

  handleClick_AddChurch: function () {
    browserHistory.push("/church/create");
  },
});

module.exports = Page;
