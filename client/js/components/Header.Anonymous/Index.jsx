var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;

var NavigationActions = require('../../actions/NavigationActions');

var Style = require('./Style.jsx');
var Item = require('./Item.jsx');
var MenuItem = require('../Header/Item.jsx');
var MenuSubItem = require('../Header/SubItem.jsx');

var Header = React.createClass({
	getInitialState: function () {
		return {
			style: '',
		}
	},

	componentWillMount: function () {
		this.setState({
			style: Style,
		});
	},

	componentDidMount: function () {
		$("#header-navigation-mobile-panel").hide();
		$("#header-navigation-mobile-button-down").show();
		$("#header-navigation-mobile-button-up").hide();
	},

	render: function(){
		return (
			<div style={Style.navigation}>
				<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
					<Link to="/"style={Style.title} onClick={this.handleClickLink}>PlanManager</Link>
                    <span className="hidden-lg hidden-md" style={Style.menu}>
                        <MenuItem id="header-navigation-mobile-button-down" label="▼" handleClick={this.handleClickMobileDown} />
                        <MenuItem id="header-navigation-mobile-button-up" label="▲" handleClick={this.handleClickMobileUp} />
	                </span>
                    <span className="hidden-sm hidden-xs" style={Style.menu}>
                        <Item to="/login" label="Sign in" selectedStyle={Style.signInHover} defaultStyle={Style.signIn} />
                        <Item to="/register" label="Sign up" selectedStyle={Style.signUpHover} defaultStyle={Style.signUp} />
                    </span>
				</div>
            	<div id="header-navigation-mobile-panel" className="header-navigation hidden-lg hidden-md" style={{backgroundColor:"#0e2e47",display:"none",boxShadow:"0px 5px 5px rgba(0,0,0,.5)"}}>
					<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
						<div className="hidden-sm" style={{width:"100%"}}>
	                        <MenuSubItem to="/login" label="Sign in" handleClick={this.handleClickLink} fullWidth={true} />
	                        <MenuSubItem to="/register" label="Sign up" handleClick={this.handleClickLink} fullWidth={true} />
                    	</div>
						<div className="hidden-xs" style={{float:"right"}}>
	                        <MenuSubItem to="/login" label="Sign in" handleClick={this.handleClickLink} />
	                        <MenuSubItem to="/register" label="Sign up" handleClick={this.handleClickLink} />
                    	</div>
	                </div>
            	</div>
			</div>
		);
	},

	handleClickLink: function () {
		NavigationActions.changeCurrentPage("/");
		$("#header-navigation-mobile-panel").hide();
		$("#header-navigation-mobile-button-down").show();
		$("#header-navigation-mobile-button-up").hide();
	},

	handleClickMobileDown: function () {
		$("#header-navigation-mobile-panel").slideDown("fast");
		$("#header-navigation-mobile-button-down").hide();
		$("#header-navigation-mobile-button-up").show();
	},

	handleClickMobileUp: function () {
		$("#header-navigation-mobile-panel").slideUp("fast");
		$("#header-navigation-mobile-button-up").hide();
		$("#header-navigation-mobile-button-down").show();
	},
});

module.exports = Header;
