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

    var memberCount = 0;
    if (this.props.church.members) {
      memberCount = this.props.church.members.length;
    }

    var campusCount = 0;
    if (this.props.church.campuses) {
      campusCount = this.props.church.campuses.length;
    }

		return (
				<div
          style={style}
          onClick={this.handleClick_Li}
          onMouseEnter={this.handleMouseEnter_Li}
          onMouseLeave={this.handleMouseLeave_Li}>
          <h3 style={{margin:"5px 0",color:"#c36b74"}}>{this.props.church.name}</h3>
          <p>
            {this.props.church.missionStatement}<br/>
            Members: {memberCount} | Campuses: {campusCount}
          </p>
        </div>
		);
	},

  handleClick_Li: function () {
    browserHistory.push("/church/" + this.props.church._id);
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
