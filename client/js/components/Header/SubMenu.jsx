var React = require('react');

var Style = require('./Style.jsx');
var MenuNavButton = require('./MenuNavButton.jsx');
var SubMenuListItem = require('./SubMenuListItem.jsx');

var SubMenu = React.createClass({
	render: function () {
		return (
  		<ul id="menu-sub" style={Style.subMenu}>
	  		<SubMenuListItem label={"Church"} to={"/church"} />
		  	<SubMenuListItem label={"Members"} to={"/member"} />
  			<SubMenuListItem label={"Sign out"} to={"/sign-out"} />
  		</ul>
		);
	},
});

module.exports = SubMenu;
