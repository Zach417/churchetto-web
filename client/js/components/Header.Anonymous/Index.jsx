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
					<div id="shutdown-message" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-centered"
						style={{padding:"10px",backgroundColor:"red",color:"white",fontFamily:"'Rokkitt', serif"}}>
						<h2>Churchetto is shutting down on October 31, 2019</h2>
						<p>
							It was a great run, and thanks for being a part of it! Unforunately, the cost of running this application is too great, and the Tip Jar feature has not resulted in any funds raised for maintence. I will be downloading the database before shuttind down, so email me if you need a copy of your data.
						</p>
						<p>All the best,</p>
						<p>Zach</p>
						<p onClick={this.handleClick_CloseMessage} style={{cursor:"pointer"}}>
							<i>Close this message</i>
						</p>
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

	handleClick_CloseMessage: function () {
		document.getElementById("shutdown-message").style.display = "none";
	}
});

module.exports = Header;
