var React = require('react');

var Style = require('./Style.jsx');
var MenuListItem = require('./MenuListItem.jsx');

var Menu = React.createClass({
	render: function () {
		return (
  		<ul id="menu" style={Style.menu}>
				<MenuListItem label={"Church"} to={"/church"}
					className="hidden-xs" />
  		</ul>
		);
	},
});

module.exports = Menu;
