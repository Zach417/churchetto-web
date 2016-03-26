var React = require('react');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

var FeedItemConstants = require('../../constants/FeedItemConstants.js');

var TaskCategoryStore = require('../../stores/TaskCategoryStore');
var TaskCategoryActions = require('../../actions/TaskCategoryActions');

var Style = require('./Style.jsx');
var TaskCategory = require('../TaskCategory/Index.jsx');
var ModalWindow = require('../ModalWindow/Index.jsx');
var FeedItem = require('../Feed/Item.jsx');

var createTaskTypeLinkOptions = {
    pathname: '/settings/task-category',
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
    TaskCategoryStore.get(function (docs) {
        callback({
            taskCategories: docs
        });
    });
}

function createComponents(docs) {

    if (docs.length === 0){
        return;
    }

    return docs.map(function (doc) {

        var body = (
            <div>{doc.description}</div>
        );

        var handleClickOpen = function () {
            browserHistory.push("/settings/task-category?action=open&id=" + doc._id);
        };

        var handleClickDelete = function () {
            TaskCategoryActions.destroy(doc);
        };

        var actionItems = [
            { type: "open", handleClick: handleClickOpen },
            { type: "delete", handleClick: handleClickDelete }
        ];

        var loadModalWindow = function () {
            if (getParameterByName('action') == 'open' && getParameterByName('id') == doc._id) {
                var id = getParameterByName('id');
                var content = <TaskCategory id={id} />
                return (
                    <ModalWindow content={content} parentPath={"/settings/task-category"} />
                )
            }
        };

        var linkPath = "/settings/task-category?action=open&id=" + doc._id;

        return (
            <div>
                {loadModalWindow()}
                <FeedItem
                    key={doc._id}
                    iconSrc={"🔧"}
                    object={doc}
                    heading={doc.icon + " " + doc.name}
                    subHeading={"Task Category Settings"}
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
            taskCategories: ''
        }
    },

    componentWillMount: function () {
        getState(function (state) {
            this.setState(state);
        }.bind(this));
    },

    componentDidMount: function() {
        TaskCategoryStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TaskCategoryStore.removeChangeListener(this._onChange);
    },

    render: function(){
        return (
            <div>
                <Link to={createTaskTypeLinkOptions} replace={true}>
                    <div style={Style.newTaskTypeButton}>
                        + Create Task Category
                    </div>
                </Link>
                <div>
                    {this.loadModalWindow()}
                    {createComponents(this.state.taskCategories)}
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
            var content = <TaskCategory />;
            return (
                <ModalWindow content={content} parentPath={"/settings/task-category"} />
            )
        }
    },
});

module.exports = Settings;
