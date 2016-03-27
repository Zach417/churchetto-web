var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;

var Style = require('./Style.jsx');
var Menu = require('./Menu.jsx');
var SubMenu = require('./SubMenu.jsx');

var Header = React.createClass({
	render: function () {
		return (
			<div style={Style.navigation}>
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-centered"
					style={{padding:"0"}}>
					<Link to="/" style={Style.title}>{"Churchetto"}</Link>
					<Menu />
				</div>
				<div style={Style.menuNav} id="menu-nav">
					<SubMenu />
				</div>
			</div>
		);
	},
});

module.exports = Header;
