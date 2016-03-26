var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;

var Style = require('./Style.jsx');

var Header = React.createClass({
	render: function(){
		return (
			<div style={Style.navigation}>
				<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered" style={{padding:"0"}}>
					<Link to="/" style={Style.title}>{"Churchetto"}</Link>
					<ul style={Style.menu}>
						<li style={Style.menuItem}>{"Sign up"}</li>
						<li style={Style.menuNav}>{". . ."}</li>
					</ul>
				</div>
			</div>
		);
	}
});

module.exports = Header;
