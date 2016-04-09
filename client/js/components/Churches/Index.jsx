var React = require('react');
var S = require('string');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var ListItem = require('./ListItem.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var Input = require('../Form/Index.jsx').Input;
var ChurchStore = require('../../stores/ChurchStore');

var Churches = React.createClass({
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
              style={{padding:"0px"}}>
              <img src="/img/wait" />
            </div>
          </div>
        </div>
      )
    }

    return (
      <div style={Style.componentContainer}>
        <div className="row-fluid">
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-8" style={{padding:"0px"}}>
            <h1 style={{margin:"5px 0"}}>Churches</h1>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-4" style={{padding:"0px"}}>
            <div style={{float:"right"}}>
              <ButtonPrimary label={"New"} onClick={this.handleClick_AddChurch} />
            </div>
          </div>
        </div>
        <div className="row-fluid" style={{display:"none"}}>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{padding:"0px"}}>
            <Input
              type={"text"}
              placeholder={"Search..."}
              onChange={this.handleChange_Search} />
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{padding:"0px"}}>
            <div style={{float:"right",padding:"5px 0"}}>
              <span>Count: {this.state.churches.length}</span>
            </div>
          </div>
        </div>
        <div className="row-fluid">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{padding:"0px"}}>
            {this.getChurches()}
          </div>
        </div>
      </div>
    )
  },

  getChurches: function () {
    return this.state.churches.map(function (doc, i) {
      return (
        <ListItem key={i} church={doc} />
      )
    });
  },

  handleChange_ChurchStore: function () {
    this.setState(this.getInitialState());
    this.componentWillMount();
  },

  handleChange_Search: function (event) {
    var search = event.target.value.toString();
    var result = [];

    ChurchStore.get(function (docs) {
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
        churches: result,
        isLoading: false,
      })
    }.bind(this));
  },

  handleClick_AddChurch: function () {
    browserHistory.push("/church/create");
  }
});

module.exports = Churches;
