var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;

var Style = require('./Style.jsx');

var MenuNavButton = React.createClass({
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
    var style = Style.menuNavButton;
    if (this.state.isHovered) {
      style = Style.menuNavButtonHover;
    }

		return (
				<span id="menu-button" style={style}
          onClick={this.handleClick_MenuNavButton}
          onMouseEnter={this.handleMouseEnter_Li}
          onMouseOut={this.handleMouseOut_Li}>
          {". . ."}
        </span>
		);
	},

	handleClick_MenuNavButton: function () {
    $("#menu-sub").slideToggle("fast");
    if ($("#menu-button").text() == ". . .") {
      $("#menu-button").text("| | |");
    } else {
      $("#menu-button").text(". . .");
    }
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

module.exports = MenuNavButton;
