var React = require('react');

var Style = require('./Style.jsx');

var FeedItemMeetingActions = React.createClass({
    render: function(){
        return (
            <div>
                <button style={Style.actionItem} className="btn btn-default">View</button>
            </div>
        )
    }
});

module.exports = FeedItemMeetingActions;