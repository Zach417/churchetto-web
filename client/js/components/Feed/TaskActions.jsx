var React = require('react');
var browserHistory = require('react-router').browserHistory;

var Style = require('./Style.jsx');
var TaskCompleteDialog = require('../TaskCompleteDialog/Index.jsx');
var OpenAction = require('./Actions.jsx').Open;

var TaskStore = require('../../stores/TaskStore');
var TaskActions = require('../../actions/TaskActions');

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var FeedItemTaskActions = React.createClass({
    render: function(){
        return (
            <div>
                {this.displayTaskCompleteDialog()}
                <OpenAction handleClick={this.handleClickOpenTask} />
                <button style={Style.actionItem} className="btn btn-xs btn-link"  onClick={this.handleClickCompleteTask}>
                    <span>✔️ Complete</span>
                </button>
                <button style={Style.actionItem} className="btn btn-xs btn-link" onClick={this.handleClickDeleteTask}>
                    <span style={Style.actionWarning}>❌ Delete</span>
                </button>
            </div>
        )
    },

    displayTaskCompleteDialog: function () {
        if (getParameterByName('action') == 'complete-task' && getParameterByName('id') == this.props.task._id) {
            return (
                <TaskCompleteDialog task={this.props.task} />
            )
        }
    },

    handleClickOpenTask: function () {
        browserHistory.push(window.location.pathname + "?action=open-task&id=" + this.props.task._id);
    },

    handleClickCompleteTask: function () {
        browserHistory.push(window.location.pathname + "?action=complete-task&id=" + this.props.task._id);
    },

    handleClickDeleteTask: function () {
    	TaskActions.destroy(this.props.task);
        this.props.handleDelete();
    },
});

module.exports = FeedItemTaskActions;
