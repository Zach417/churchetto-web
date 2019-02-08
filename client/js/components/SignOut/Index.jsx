var React = require('react');
var Style = require('./Style.jsx');

var SignOut = React.createClass({
  componentWillMount: function () {
    return window.location.assign('/sign-out');
  },

  render: function () {
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
  },
});

module.exports = SignOut;
