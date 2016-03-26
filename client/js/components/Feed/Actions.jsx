var React = require('react');

var Style = require('./Style.jsx');

var OpenAction = React.createClass({
    render: function(){
        return (
            <button style={Style.actionItem} className="btn btn-xs btn-link" onClick={this.props.handleClick}>
                <span>📂 Open</span>
            </button>
        )
    },
});

var DeleteAction = React.createClass({
    render: function(){
        return (
            <button style={Style.actionItem} className="btn btn-xs btn-link" onClick={this.props.handleClick}>
                <span style={Style.actionWarning}>❌ Delete</span>
            </button>
        )
    },
});

module.exports = {
    Open: OpenAction,
    Delete: DeleteAction,
};
