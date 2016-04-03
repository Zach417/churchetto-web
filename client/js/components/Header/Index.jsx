var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;

var Style = require('./Style.jsx');
var Menu = require('./Menu.jsx');
var MenuNavButton = require('./MenuNavButton.jsx');
var SubMenu = require('./SubMenu.jsx');

var Header = React.createClass({
	render: function () {
		return (
			<div style={Style.headerContainer}>
				<div style={Style.navigation} className="hidden-sm hidden-xs">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-centered"
						style={{padding:"0"}}>
						<Link to="/" style={Style.title}>{"Churchetto"}</Link>
						<Link to="/">
							<img style={Style.logo} src="/img/logo-icon" onClick={this.handleClick_Logo} />
						</Link>
						<div style={Style.menuContainer}>
							<Menu />
							<MenuNavButton />
						</div>
					</div>
				</div>
				<div style={Style.navigationMobile}>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-centered"
						style={{padding:"0"}}>
						<Link to="/" style={Style.title}>{"Churchetto"}</Link>
						<Link to="/">
							<img style={Style.logo} src="/img/logo-icon" onClick={this.handleClick_Logo} />
						</Link>
						<div style={Style.menuContainer}>
							<Menu />
							<MenuNavButton />
						</div>
					</div>
				</div>
				<SubMenu />
			</div>
		);
	},
});

module.exports = Header;
