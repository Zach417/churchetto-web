var React = require('react');
var browserHistory = require('react-router').browserHistory;
var $ = require('jquery');

var Style = require('./Style.jsx');
var Navigation = require('./Navigation.jsx');
var ChurchStore = require('../../stores/ChurchStore');

var HomePage = React.createClass({
  getInitialState: function () {
    return {
      campuses: [],
      churches: [],
      members: [],
      isLoading: true,
    }
  },

  componentWillMount: function () {
    ChurchStore.get(function (docs) {
      this.setState({
        campuses: this.state.campuses,
        churches: docs,
        members: this.state.members,
        isLoading: false,
      });
    }.bind(this));
  },

  componentDidMount: function() {
    window.scrollTo(0, 0);
  },

  render: function() {
    if (this.state.isLoading === true) {
      return (
        <div style={Style.pageContainer}>
    			<div className="row-fluid" style={Style.jumbotron}>
    				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-centered"
              style={{padding:"0"}}>
              <img src="/img/wait" />
            </div>
          </div>
        </div>
      )
    }

    return (
      <div style={Style.headerPadding}>
        <div className="row-fluid">
          <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered"
            style={{margin:"20px auto",padding:"0"}}>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div style={Style.entitySummary}>
                <h1>{this.state.churches.length}</h1>
                <p>Churches</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div className="hidden-lg hidden-md" style={{marginTop:"10px"}} />
              <div style={Style.entitySummary}>
                <h1>{this.state.campuses.length}</h1>
                <p>Campuses</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div className="hidden-lg hidden-md" style={{marginTop:"10px"}} />
              <div style={Style.entitySummary}>
                <h1>{this.state.members.length}</h1>
                <p>Members</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = HomePage;
