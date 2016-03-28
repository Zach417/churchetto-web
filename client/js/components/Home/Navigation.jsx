var React = require('react');

var LinkItem = require('../Navigation/LinkItem.jsx');
var Spacer = require('../Navigation/Spacer.jsx');
var Header = require('../Navigation/Header.jsx');

var Navigation = React.createClass({

    render: function(){
        return (
            <div>
                <LinkItem label="You are home" link="/" backgroundColor="#3c948b" backgroundColorHover="#2c6d66" />
                <Spacer />

                <Header label="Church" />
                <LinkItem label="Things" link="/settlor" backgroundColor="#3b3a36" backgroundColorHover="#282725" />
                <LinkItem label="More Things" link="/fiduciary" backgroundColor="#3b3a36" backgroundColorHover="#282725" />

            </div>
        )
    },
});

module.exports = Navigation;
