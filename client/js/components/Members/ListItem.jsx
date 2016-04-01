var React = require('react');
var $ = require('jquery');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');

var ListItem = React.createClass({
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
    var style = Style.listItem;
    if (this.state.isHovered) {
      style = Style.listItemHover;
    }

		return (
				<div
          style={style}
          key={this.props.key}
          onClick={this.handleClick_Li}
          onMouseEnter={this.handleMouseEnter_Li}
          onMouseLeave={this.handleMouseLeave_Li}>
          <h3 style={{margin:"5px 0",color:"#c36b74"}}>
            {this.props.member.firstName + " "}
            {this.props.member.lastName}
          </h3>
          <p>
            {this.props.member.address.city + ", "}
            {this.props.member.address.state + " "}
            {this.props.member.address.zip}
          </p>
        </div>
		);
	},

  handleClick_Li: function () {
    browserHistory.push("/member/" + this.props.member._id);
  },

  handleMouseEnter_Li: function () {
    this.setState({
      isHovered: true,
    });
  },

  handleMouseLeave_Li: function () {
    this.setState({
      isHovered: false,
    });
  },
});

module.exports = ListItem;
