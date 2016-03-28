var React = require('react');
var $ = require('jquery');
var browserHistory = require('react-router').browserHistory;

var Style = require('./Style.jsx');

var MenuListItem = React.createClass({
  getInitialState: function () {
    return {
      isHovered: ''
    }
  },

  componentWillMount: function () {
    this.setState({
      isHovered: false,
    });
  },

	render: function () {
    var style = Style.menuItem;
    if (this.state.isHovered) {
      style = Style.menuItemHover;
    }

		return (
				<li
          style={style}
          className={this.props.className}
          onClick={this.handleClick_Li}
          onMouseEnter={this.handleMouseEnter_Li}
          onMouseOut={this.handleMouseOut_Li}>
          {this.props.label}
        </li>
		);
	},

  handleClick_Li: function () {
    browserHistory.push(this.props.to);
  },

  handleMouseEnter_Li: function () {
    this.setState({
      isHovered: true,
    });
  },

  handleMouseOut_Li: function () {
    this.setState({
      isHovered: false,
    });
  },
});

module.exports = MenuListItem;
