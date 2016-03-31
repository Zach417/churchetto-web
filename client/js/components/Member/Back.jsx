var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');

var Back = React.createClass({
  getInitialState: function () {
    return {
      isSelected: '',
    }
  },

  componentWillMount: function () {
    this.setState({
      isSelected: false,
    });
  },

  render: function () {
    if (this.state.isSelected) {
      return (
        <div style={Style.backContainerHover} onClick={this.handleClick_Back}
          onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
          <h1 style={{margin:"0",float:"right"}}>◀ Back</h1>
        </div>
      )
    }

    return (
      <div style={Style.backContainer} onClick={this.handleClick_Back}
        onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        <h1 style={{margin:"0",float:"right"}}>◀ Back</h1>
      </div>
    )
  },

  handleClick_Back: function () {
    browserHistory.push("/member");
  },

  handleMouseEnter: function () {
      this.setState({
          isSelected: true,
      });
  },

  handleMouseLeave: function () {
      this.setState({
          isSelected: false,
      });
  },
});

module.exports = Back;
