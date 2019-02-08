var React = require('react');

var FeedItemDocument = React.createClass({
    render: function(){
        return (
            <div>
                <p className="text-inline">You have an upcoming document to upload.</p>
            </div>
        )
    }
});

module.exports = FeedItemDocument;