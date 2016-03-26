var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;

var Style = require('./Style.jsx');
var Item = require('./Item.jsx');
var SubItem = require('./SubItem.jsx');

var Header = React.createClass({
	render: function(){
		return (
			<div style={Style.navigation}>
				<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
					<Link to="/" className="header-navigation-link header-navigation-title">Churchetto</Link>
				</div>
			</div>
		);
	},
});

module.exports = Header;
