var React = require('react');

var Style = require('./Style.jsx');

var FeedItemDocument = React.createClass({
    render: function(){
        return (
            <div>
                <p className="text-inline">Import: </p>
                <input style={Style.actionItem} type="text" name="documentName" />
                <button style={Style.actionItem} className="btn btn-default">...</button>
            </div>
        )
    }
});

module.exports = FeedItemDocument;