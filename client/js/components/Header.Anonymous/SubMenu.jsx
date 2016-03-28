var React = require('react');

var Style = require('./Style.jsx');
var MenuNavButton = require('./MenuNavButton.jsx');
var SubMenuListItem = require('./SubMenuListItem.jsx');

var SubMenu = React.createClass({
	render: function () {
		return (
  		<ul id="menu-sub" style={Style.subMenu}>
	  		<SubMenuListItem label={"Sign up"} to={"/sign-up"}
					className="hidden-lg hidden-md hidden-sm" />
	  		<SubMenuListItem label={"Sign in"} to={"/sign-in"} />
  			<SubMenuListItem label={"Forgot password"} to="/forgot-password" />
  		</ul>
		);
	},
});

module.exports = SubMenu;
