var React = require('react');
var $ = require('jquery');
var browserHistory = require('react-router').browserHistory;

var Style = require('./Style.jsx');
var Content = require('./Content.jsx');
var ModalWindow = require('../ModalWindow/Index.jsx');

var TaskCompleteDialog = React.createClass({
    render: function () {
        return (
            <ModalWindow content={<Content task={this.props.task} />} parentPath={window.location.pathname} />
        )
    }
});

module.exports = TaskCompleteDialog;
