var React = require('react');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

var FeedItemConstants = require('../../constants/FeedItemConstants.js');

var TaskTypeStore = require('../../stores/TaskTypeStore');
var TaskTypeActions = require('../../actions/TaskTypeActions');

var Style = require('./Style.jsx');
var TaskType = require('../TaskType/Index.jsx');
var ModalWindow = require('../ModalWindow/Index.jsx');
var FeedItem = require('../Feed/Item.jsx');
var FeedItemBody = require('../Feed/Task.jsx');

var createTaskTypeLinkOptions = {
    pathname: '/settings/task-type',
    query: {
        action: 'create'
    }
};

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getState(callback) {
    TaskTypeStore.get(function (docs) {
        callback({
            taskTypes: docs
        });
    });
}

function createComponents(docs) {

    if (docs.length === 0){
        return;
    }

    return docs.map(function (doc) {

        var task = {
            taskTypeId: doc._id
        };

        var body = (
            <FeedItemBody task={task} />
        );

        var handleClickOpen = function () {
            browserHistory.push("/settings/task-type?action=open&id=" + doc._id);
        };

        var handleClickDelete = function () {
            TaskTypeActions.destroy(doc);
        };

        var actionItems = [
            { type: "open", handleClick: handleClickOpen },
            { type: "delete", handleClick: handleClickDelete }
        ];

        var loadModalWindow = function () {
            if (getParameterByName('action') == 'open' && getParameterByName('id') == doc._id) {
                var id = getParameterByName('id');
                var content = <TaskType id={id} />
                return (
                    <ModalWindow content={content} parentPath={"/settings/task-type"} />
                )
            }
        };

        var linkPath = "/settings/task-type?action=open&id=" + doc._id;

        return (
            <div>
                {loadModalWindow()}
                <FeedItem
                    key={doc._id}
                    iconSrc={"🔧"}
                    object={doc}
                    heading={doc.name}
                    subHeading={"Task Type Settings"}
                    body={body}
                    actions={actionItems}
                    linkPath={linkPath} />
            </div>
        );

    });
}

var Settings = React.createClass({
    getInitialState: function() {
        return {
            taskTypes: ''
        }
    },

    componentWillMount: function () {
        getState(function (state) {
            this.setState(state);
        }.bind(this));
    },

    componentDidMount: function() {
        TaskTypeStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TaskTypeStore.removeChangeListener(this._onChange);
    },

    render: function(){
        return (
            <div>
                <Link to={createTaskTypeLinkOptions} replace={true}>
                    <div style={Style.newTaskTypeButton}>
                        + Create Task Type
                    </div>
                </Link>
                <div>
                    {this.loadModalWindow()}
                    {createComponents(this.state.taskTypes)}
                </div>
            </div>
        )
    },

    _onChange: function () {
        getState(function (state) {
            this.setState(state);
        }.bind(this));
    },

    handleLabelClick: function () {
        browserHistory.push(this.props.linkPath);
    },

    loadModalWindow: function () {
        if (getParameterByName('action') == 'create' ) {
            var content = <TaskType />;
            return (
                <ModalWindow content={content} parentPath={"/settings/task-type"} />
            )
        }
    },
});

module.exports = Settings;
