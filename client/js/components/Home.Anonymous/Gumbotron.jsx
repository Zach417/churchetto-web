var React = require('react');
var Link = require('react-router').Link;
var $ = require('jquery');

var Style = require('./Style.jsx');

var Gumbotron = React.createClass({
  render: function() {
    return (
      <div className="container-fluid" style={Style.gumbotron}>
        <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered"
          style={{padding:"0"}}>
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <h1 style={{margin:"0"}}>{"Don't miss a beat"}</h1>
            <p>
              Get everything done from one place,
              quickly and effortlessly.
            </p>
          </div>
          <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
            <img src="/img/mkt/home-dashboard" style={{width:"100%"}} />
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
          style={{padding:"10px 0"}} />
        <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered"
          style={{padding:"0"}}>
          <div className="col-lg-8 col-md-8 hidden-sm hidden-xs">
            <img src="/img/mkt/church-members" style={{width:"100%"}} />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <h1 style={{margin:"0"}}>Manage members</h1>
            <p>
              {"Effortlessly keep up with your members' most "}
              {"important details."}
            </p>
          </div>
          <div className="hidden-lg hidden-md col-sm-12 col-xs-12">
            <img src="/img/mkt/church-members" style={{width:"100%"}} />
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
          style={{padding:"10px 0"}} />
        <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered"
          style={{padding:"0"}}>
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <h1 style={{margin:"0"}}>Track contributions</h1>
            <p>
              Follow contribution patterns over time
              to gain key insight into your congregation.
            </p>
          </div>
          <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
            <img src="/img/mkt/church-contributions" style={{width:"100%"}} />
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Gumbotron;
