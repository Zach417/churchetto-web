var React = require('react');
var S = require('string');

var LinkItem = require('../Navigation/LinkItem.jsx');
var Spacer = require('../Navigation/Spacer.jsx');
var Header = require('../Navigation/Header.jsx');

function getSelectionStatus(path) {
    if (window.location.pathname === path) {
        return true;
    } else {
        return false;
    }
}

function getBackLinkPath() {
    if (window.location.pathname === "/fiduciary") {
        return "/";
    } else {
        return "/fiduciary";
    }
}

function getBackLinkLabel() {
    if (window.location.pathname === "/fiduciary") {
        return "◄ Back home";
    } else if (S(window.location.pathname).startsWith("/fiduciary")) {
        return "◄ Back to fiduciary oversight";
    } else {
        return "◄ Back";
    }
}

var Navigation = React.createClass({
    render: function(){
        return (
            <div className="feed-navigation">
                <LinkItem label={getBackLinkLabel()} link={getBackLinkPath()} />
                <Spacer />

                <Header label="Oversight" />
                <LinkItem label="💰 Investments" link="/fiduciary/investments" backgroundColor="#222222" backgroundColorHover="#0d0d0d" />
                <LinkItem label="🏬 Vendors" link="/fiduciary/vendors" backgroundColor="#222222" backgroundColorHover="#0d0d0d" />
                <LinkItem label="🏢 Administration" link="/fiduciary/administration" backgroundColor="#222222" backgroundColorHover="#0d0d0d" />
            </div>
        )
    }
});

module.exports = Navigation;
