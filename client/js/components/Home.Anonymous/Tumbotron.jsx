var React = require('react');
var browserHistory = require('react-router').browserHistory;
var $ = require('jquery');

var Style = require('./Style.jsx');

var Tumbotron = React.createClass({
  getInitialState: function () {
    return {
      isHovered: false,
    }
  },

  render: function() {
    return (
      <div
        className="container-fluid"
        style={this.getStyle()}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}>
        <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered"
          style={{padding:"0px"}}>
					<h1 style={{margin:"0px",padding:"150px 0px"}}>Click here to sign up</h1>
        </div>
      </div>
    );
  },

  getStyle: function () {
    var style = Style.tumbotron;
    if (this.state.isHovered === true) {
      style = Style.tumbotronHovered;
    }
    return style;
  },

  handleClick: function () {
    browserHistory.push("/sign-up");
  },

  handleMouseEnter: function () {
    this.setState({
      isHovered: true,
    });
  },

  handleMouseLeave: function () {
    this.setState({
      isHovered: false,
    });
  },
});

module.exports = Tumbotron;
