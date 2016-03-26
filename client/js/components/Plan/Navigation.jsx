var React = require('react');
var S = require('string');

var LinkItem = require('../Navigation/LinkItem.jsx');
var Spacer = require('../Navigation/Spacer.jsx');
var Header = require('../Navigation/Header.jsx');

function getBackLinkPath(planId) {
    if (window.location.pathname === "/plan/" + planId) {
        return "/";
    } else {
        return "/plan/" + planId;
    }
}

function getBackLinkLabel(planId) {
    if (window.location.pathname === "/plan/" + planId) {
        return "◄ Back home";
    } else if (S(window.location.pathname).startsWith("/plan/" + planId)) {
        return "◄ Back to plan profile";
    } else {
        return "◄ Back";
    }
}

var NavigationFeed = React.createClass({
    render: function(){
        return (
            <div className="feed-navigation">
                <LinkItem label={getBackLinkLabel(this.props.planId)} link={getBackLinkPath(this.props.planId)} />
                <Spacer />

                <Header label="📡 Oversight" />
                <LinkItem label="📜 Plan Settlor" link={"/plan/" + this.props.planId + "/settlor"} backgroundColor="#222222" backgroundColorHover="#0d0d0d" />
                <LinkItem label="🔖 Plan Fiduciary" link={"/plan/" + this.props.planId + "/fiduciary"} backgroundColor="#222222" backgroundColorHover="#0d0d0d" />

            	<Header label="🔦 Plan Navigation" />
                <LinkItem label="📜 Terms" link={"/plan/" + this.props.planId + "/terms"} backgroundColor="#0e2e47" backgroundColorHover="#081c2b" />
                <LinkItem label="📂 Documents" link={"/plan/" + this.props.planId + "/documents"} backgroundColor="#0e2e47" backgroundColorHover="#081c2b" />
                <LinkItem label="⚙ Settings" link={"/plan/" + this.props.planId + "/settings"} backgroundColor="#0e2e47" backgroundColorHover="#081c2b" />
            </div>
        )
    }
});

module.exports = NavigationFeed;
