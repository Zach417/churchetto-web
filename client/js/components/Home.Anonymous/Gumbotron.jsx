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
            <img src="/img/mkt/volunteering" style={{width:"100%"}} />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <h1 style={{margin:"0"}}>Find Volunteers</h1>
            <p>
              Use email workflows to organize events and
              fill volunteer positions with a click of a
              button.
            </p>
          </div>
          <div className="hidden-lg hidden-md col-sm-12 col-xs-12">
            <img src="/img/mkt/volunteering" style={{width:"100%"}} />
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
          style={{padding:"10px 0"}} />
        <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered"
          style={{padding:"0"}}>
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <h1 style={{margin:"0"}}>Manage your data</h1>
            <p>
              Keeping up with members, groups, and events
              at your church has never been easier.
            </p>
          </div>
          <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
            <img src="/img/mkt/church-members" style={{width:"100%"}} />
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Gumbotron;
