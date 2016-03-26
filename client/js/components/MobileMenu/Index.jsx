var React = require('react');
var Link = require('react-router').Link;
var Style = require('./Style.jsx');

var MobileMenu = React.createClass({
    render: function () {
        return (
            <div style={Style.container} className="hidden-lg hidden-md">
                <div style={Style.linkItemContainer} className="col-sm-3 col-xs-3">
                    <Link to="/settlor" style={Style.linkItem}>📜</Link>
                </div>
                <div style={Style.linkItemContainer} className="col-sm-3 col-xs-3">
                    <Link to="/fiduciary" style={Style.linkItem}>🔖</Link>
                </div>
                <div style={Style.linkItemContainer} className="col-sm-3 col-xs-3">
                    <Link to="/plan" style={Style.linkItem}>📂</Link>
                </div>
                <div style={Style.linkItemContainer} className="col-sm-3 col-xs-3">
                    <Link to="/action" style={Style.linkItem}>🔨</Link>
                </div>
            </div>
        )
    }
});

module.exports = MobileMenu;
