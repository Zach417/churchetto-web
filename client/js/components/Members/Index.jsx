var React = require('react');
var S = require('string');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var ListItem = require('./ListItem.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var Input = require('../Form/Index.jsx').Input;
var MemberStore = require('../../stores/MemberStore');

var Members = React.createClass({
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
    }

    return (
      <div style={Style.componentContainer}>
        <div className="row-fluid">
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12" style={{padding:"0"}}>
            <h1 style={{margin:"5px 0"}}>Your members</h1>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 hidden-xs" style={{padding:"0"}}>
            <div style={{float:"right"}}>
              <ButtonPrimary label={"New"} onClick={this.handleClick_AddMember} />
            </div>
          </div>
          <div className="hidden-lg hidden-md hidden-sm col-xs-12" style={{padding:"0"}}>
            <div style={{paddingBottom:"10px"}}>
              <ButtonPrimary label={"New"} onClick={this.handleClick_AddMember} />
            </div>
          </div>
        </div>
        <div className="row-fluid">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{padding:"0"}}>
            <Input
              type={"text"}
              placeholder={"Search..."}
              onChange={this.handleChange_Search} />
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{padding:"0"}}>
            <div style={{float:"right",padding:"5px 0"}}>
              <span>Count: {this.state.members.length}</span>
            </div>
          </div>
        </div>
        <div className="row-fluid">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{padding:"0"}}>
            {this.getMembers()}
          </div>
        </div>
      </div>
    )
  },

  getMembers: function () {
    return this.state.members.map(function (doc) {
      return (
        <ListItem key={doc._id} member={doc} />
      )
    });
  },

  handleChange_MemberStore: function () {
    this.setState(this.getInitialState());
    this.componentWillMount();
  },

  handleChange_Search: function (event) {
    var search = event.target.value.toString();
    var result = [];

    MemberStore.get(function (docs) {
      if (!docs || docs.length === 0) {
        return result;
      }

      for (var i = 0; i < docs.length; i++) {
        if (S(docs[i].name.toUpperCase()).contains(search.toUpperCase())) {
          result.push(docs[i]);
          continue;
        }
      }

      this.setState({
        members: result,
        isLoading: false,
      })
    }.bind(this));
  },

  handleClick_AddMember: function () {
    browserHistory.push("/member/create");
  }
});

module.exports = Members;
