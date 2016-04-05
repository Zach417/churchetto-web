var React = require('react');
var Style = require('./Style.jsx');

var EntitySummary = React.createClass({
  getInitialState: function () {
    return {
      isSelected: false,
    }
  },

  render: function () {
    var style = Style.entitySummary;
    if (this.state.isSelected === true) {
      style = Style.entitySummaryHover;
    }

    return (
      <div
        style={style}
        onClick={this.props.onClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}>
        {this.props.children}
      </div>
    )
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

module.exports = EntitySummary;
