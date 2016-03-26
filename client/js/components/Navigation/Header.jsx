var React = require('react');

var Style = require('./Style.jsx');

var Header = React.createClass({
    render: function () {
        return (
            <div style={Style.header}>
            	{this.props.label}
            </div>
        )
    }
});

module.exports = Header;