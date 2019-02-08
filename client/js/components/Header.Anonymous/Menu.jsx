var React = require('react');

var Style = require('./Style.jsx');
var MenuListItem = require('./MenuListItem.jsx');

var Menu = React.createClass({
	render: function () {
		return (
  		<ul id="menu" style={Style.menu}>
				<MenuListItem label={"Sign up"} to={"/sign-up"}
					className="hidden-xs" />
  		</ul>
		);
	},
});

module.exports = Menu;
