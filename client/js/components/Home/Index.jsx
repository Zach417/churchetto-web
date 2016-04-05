var React = require('react');
var browserHistory = require('react-router').browserHistory;
var $ = require('jquery');

var Style = require('./Style.jsx');
var Church = require('./Church.jsx');
var Event = require('./Event.jsx');
var Group = require('./Group.jsx');
var Member = require('./Member.jsx');

var HomePage = React.createClass({
  componentDidMount: function() {
    window.scrollTo(0, 0);
  },

  render: function() {
    return (
      <div style={Style.headerPadding}>
        <div className="row-fluid">
          <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered"
            style={{margin:"20px auto",padding:"0"}}>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Church />
              <div style={{marginTop:"20px"}} />
              <Member />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div style={{marginTop:"20px"}} className="hidden-lg hidden-md" />
              <Event />
              <div style={{marginTop:"20px"}} />
              <Group />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = HomePage;
