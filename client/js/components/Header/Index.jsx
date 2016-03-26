var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;

var Notifications = require('../Notifications/Index.jsx');
var UserStore = require('../../stores/UserStore');

var Style = require('./Style.jsx');
var Item = require('./Item.jsx');
var SubItem = require('./SubItem.jsx');
var MobileMenu = require('../MobileMenu/Index.jsx');

var Header = React.createClass({
	getInitialState: function () {
		return {
			user: ''
		}
	},

	componentWillMount: function () {
		UserStore.get(function (docs) {
			this.setState({
				user: docs[0]
			});
		}.bind(this));
	},

	componentDidMount: function () {
        UserStore.addChangeListener(this._onChange);

		$("#header-navigation-notifications-panel").hide();
		$("#header-navigation-settings-panel").hide();
		$("#header-navigation-settings-button-down").show();
		$("#header-navigation-settings-button-up").hide();

        $(document).mouseup(function (e) {
            if (
				(!$("#header-navigation-notifications-panel").is(e.target)
				|| $("#header-navigation-notifications-panel").has(e.target).length === 0)
				&& $(".header-navigation-notifications-button").has(e.target).length === 0
			) {
                $("#header-navigation-notifications-panel").fadeOut("fast");
            }
        });
	},

    componentWillUnmount: function() {
        UserStore.removeChangeListener(this._onChange);
    },

	render: function(){
		return (
			<div>
				<div className="header-navigation">
					<div id="header-navigation-summary" style={{backgroundColor:"#da383c",height:"5px",display:"none"}} />
					<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
						<Link to="/" className="header-navigation-link header-navigation-title" onClick={this.handleClickLink}>PlanManager</Link>
	                    <span className="header-navigation-menu">
	                        <span className="hidden-xs">
	                        	<Item to="/profile" label={this.getUserLabel()} handleClick={this.handleClickLink} />
	                        	<span className="header-navigation-notifications-button" style={{width:"100%"}}>
									<Item handleClick={this.handleClickNotification} label={this.getNotificationLabel(false)} />
								</span>
	                        </span>
	                        <Item id="header-navigation-settings-button-down" label="▼" handleClick={this.handleClickSettingsDown} />
	                        <Item id="header-navigation-settings-button-up" label="▲" handleClick={this.handleClickSettingsUp} />
	                    </span>
					</div>
	            	<div id="header-navigation-settings-panel" className="header-navigation" style={{backgroundColor:"#0e2e47",display:"none",boxShadow:"0px 5px 5px rgba(0,0,0,.5)"}}>
						<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
							<div className="hidden-lg hidden-md hidden-sm" style={{width:"100%"}}>
		                        <SubItem to="/profile" label={this.getUserLabel()} handleClick={this.handleClickLink} fullWidth={true} />
	                        	<span className="header-navigation-notifications-button" style={{width:"100%"}}>
		                        	<SubItem className="header-navigation-notifications-button" handleClick={this.handleClickNotification} label={this.getNotificationLabel(true)} fullWidth={true} />
								</span>
		                        <SubItem to="/settings" label="⚙ Settings" handleClick={this.handleClickLink} fullWidth={true} />
		                        <SubItem href="/logout" label="🚪 Sign out" handleClick={this.handleClickLink} fullWidth={true} />
	                    	</div>
							<div className="hidden-xs" style={{float:"right"}}>
		                        <SubItem href="/logout" label="🚪 Sign out" handleClick={this.handleClickLink} />
		                        <SubItem to="/settings" label="⚙ Settings" handleClick={this.handleClickLink} />
	                    	</div>
		                </div>
	            	</div>
				</div>
            	<div id="header-navigation-notifications-panel" className="header-navigation" style={{backgroundColor:"transparent",display:"none",top:"55px"}} >
					<Notifications handleClose={this.handleClickNotification} />
            	</div>
				<MobileMenu />
            </div>
		);
	},

	_onChange: function () {
		UserStore.get(function (docs) {
			this.setState({
				user: docs[0]
			});
		}.bind(this));
	},

	getUserLabel: function () {
		if (this.state.user.firstName) {
			return "👨 " + this.state.user.firstName;
		} else {
			return "👨 Profile";
		}
	},

	getNotificationLabel: function (isMobile) {
		var numberNotifications = 2;

		if (isMobile === true) {
			return "🔔 " + numberNotifications + " Notifications";
		} else {
			return "🔔 " + numberNotifications;
		}
	},

	handleClickLink: function () {
		$("#header-navigation-notifications-panel").hide();
		$("#header-navigation-settings-panel").hide();
		$("#header-navigation-settings-button-down").show();
		$("#header-navigation-settings-button-up").hide();
	},

	handleClickSettingsDown: function () {
		$("#header-navigation-notifications-panel").slideUp("fast");
		$("#header-navigation-settings-panel").slideDown("fast");
		$("#header-navigation-settings-button-down").hide();
		$("#header-navigation-settings-button-up").show();
	},

	handleClickSettingsUp: function () {
		$("#header-navigation-notifications-panel").slideUp("fast");
		$("#header-navigation-settings-panel").slideUp("fast");
		$("#header-navigation-settings-button-up").hide();
		$("#header-navigation-settings-button-down").show();
	},

	handleClickNotification: function () {
		$("#header-navigation-notifications-panel").fadeToggle("fast");
		$("#header-navigation-settings-panel").slideUp("fast");
		$("#header-navigation-settings-button-up").hide();
		$("#header-navigation-settings-button-down").show();
	},
});

module.exports = Header;
