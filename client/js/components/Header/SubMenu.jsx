var React = require('react');

var Style = require('./Style.jsx');
var MenuNavButton = require('./MenuNavButton.jsx');
var SubMenuListItem = require('./SubMenuListItem.jsx');

var SubMenu = React.createClass({
	render: function () {
		return (
  		<ul id="menu-sub" style={Style.subMenu}>
  			<SubMenuListItem label={"Profile"} to={"/profile"} />
	  		<SubMenuListItem label={"Churches"} to={"/church"} />
	  		<SubMenuListItem label={"Friends"} to={"/friends"} />
	  		<SubMenuListItem label={"Settings"} to={"/settings"} />
  			<SubMenuListItem label={"Sign out"} to={"/sign-out"} />
  		</ul>
		);
	},
});

module.exports = SubMenu;
