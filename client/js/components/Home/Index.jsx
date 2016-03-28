var React = require('react');
var $ = require('jquery');

var Style = require('./Style.jsx');
var Navigation = require('./Navigation.jsx');

var HomePage = React.createClass({
  componentDidMount: function() {
    window.scrollTo(0, 0);
  },

  render: function() {
    return (
      <div style={Style.headerPadding}>
        <div className="row-fluid">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-centered">
            <div className="col-lg-3 col-md-3 col-sm-3 hidden-xs" style={Style.noSpace}>
              <Navigation/>
            </div>
            <div className="row-fluid">
              <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12" style={Style.noSpace}>
                <div className="col-lg-8 col-md-8" style={Style.noSpace}></div>
                <div className="col-lg-4 col-md-4 hidden-sm hidden-xs" style={Style.noSpace}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = HomePage;
