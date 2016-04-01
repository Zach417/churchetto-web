var React = require('react');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Members = require('./Index.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var Member = require('../Member/Index.jsx');
var MemberStore = require('../../stores/MemberStore');

var Page = React.createClass({
  getInitialState: function () {
    return {
      members: [],
      isLoading: true,
    }
  },

  componentWillMount: function () {
    MemberStore.get(function (docs) {
      this.setState({
        members: docs,
        isLoading: false,
      });
    }.bind(this));
  },

  componentDidMount: function() {
    window.scrollTo(0, 0);
    MemberStore.addChangeListener(this.handleChange_MemberStore);
  },

  componentWillUnmount: function() {
    MemberStore.removeChangeListener(this.handleChange_MemberStore);
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
    } else if (this.state.members.length !== 0) {
      return (
        <div style={Style.pageContainer}
          className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
          <Members />
        </div>
      )
    } else {
      browserHistory.push("/member/create");
    }
  },

  handleChange_MemberStore: function () {
    this.setState(this.getInitialState());
    this.componentWillMount();
  },

  handleClick_AddChurch: function () {
    browserHistory.push("/member/create");
  },
});

module.exports = Page;
