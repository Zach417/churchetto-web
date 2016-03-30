var React = require('react');

var Style = require('./Style.jsx');
var MenuListItem = require('./MenuListItem.jsx');

var Menu = React.createClass({
	render: function () {
		return (
  		<ul id="menu" style={Style.menu}>
				<MenuListItem label={"Church"} to={"/church"}
					className="hidden-xs" />
				<MenuListItem label={"Attendance"} to={"/attendance"}
					className="hidden-xs" />
				<MenuListItem label={"Marketing"} to={"/marketing"}
					className="hidden-sm hidden-xs" />
				<MenuListItem label={"Management"} to={"/management"}
					className="hidden-md hidden-sm hidden-xs" />
  		</ul>
		);
	},
});

module.exports = Menu;
