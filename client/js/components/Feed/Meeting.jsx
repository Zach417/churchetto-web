var React = require('react');

var FeedItemMeeting = React.createClass({
    render: function(){
        return (
            <div>
                <p className="text-inline">You have an upcoming meeting.</p>
            </div>
        )
    }
});

module.exports = FeedItemMeeting;