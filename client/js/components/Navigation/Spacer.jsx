var React = require('react');

var Style = require('./Style.jsx');

var Spacer = React.createClass({
    render: function () {
        return (
            <div style={Style.spacer}></div>
        )
    }
});

module.exports = Spacer;