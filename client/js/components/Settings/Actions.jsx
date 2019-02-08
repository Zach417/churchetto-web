var React = require('react');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var ActionPage = require('../Actions/Settings.jsx');
var ActionStore = require('../../stores/ActionStore');
var ActionActions = require('../../actions/ActionActions');
var ModalWindow = require('../ModalWindow/Index.jsx');
var FeedItem = require('../Feed/Item.jsx');

var createActionLinkOptions = {
    pathname: '/settings/action',
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
    ActionStore.get(function (docs) {
        callback({
            actions: docs
        });
    });
}

function createComponents(docs) {

    if (!docs || docs.length === 0){
        return;
    }

    return docs.map(function (doc) {

        var numberOfPages = 0;
        if (doc.pages && doc.pages.length) {
            numberOfPages = doc.pages.length;
        }

        var body = (
            <div>
                <div>Name: {doc.name}</div>
                <div>Number of pages: {numberOfPages}</div>
            </div>
        );

        var handleClickOpen = function () {
            browserHistory.push("/settings/action?action=open&id=" + doc._id);
        };

        var handleClickDelete = function () {
            ActionActions.destroy(doc);
        };

        var actionItems = [
            { type: "open", handleClick: handleClickOpen },
            { type: "delete", handleClick: handleClickDelete }
        ];

        var loadModalWindow = function () {
            if (getParameterByName('action') == 'open' && getParameterByName('id') == doc._id) {
                var id = getParameterByName('id');
                var content = <ActionPage id={id} />
                return (
                    <ModalWindow content={content} parentPath={"/settings/action"} />
                )
            }
        };

        var linkPath = "/settings/action?action=open&id=" + doc._id;

        return (
            <div>
                {loadModalWindow()}
                <FeedItem
                    key={doc._id}
                    iconSrc={"🔧"}
                    object={doc}
                    heading={doc.name}
                    subHeading={"Action Item Settings"}
                    body={body}
                    actions={actionItems}
                    linkPath={linkPath} />
            </div>
        );

    });
}

var Actions = React.createClass({
    getInitialState: function() {
        return {
            actions: ''
        }
    },

    componentWillMount: function () {
        getState(function (state) {
            this.setState(state);
        }.bind(this));
    },

    componentDidMount: function() {
        ActionStore.addChangeListener(this.handleChangeActionStore);
    },

    componentWillUnmount: function() {
        ActionStore.removeChangeListener(this.handleChangeActionStore);
    },

    render: function () {
        return (
            <div>
                <Link to={createActionLinkOptions} replace={true}>
                    <div style={Style.newTaskTypeButton}>
                        + Create Action Item
                    </div>
                </Link>
                <div>
                    {this.loadModalWindow()}
                    {createComponents(this.state.actions)}
                </div>
            </div>
        )
    },

    handleChangeActionStore: function () {
        getState(function (state) {
            this.setState(state);
        }.bind(this));
    },

    handleClickLabel: function () {
        browserHistory.push(this.props.linkPath);
    },

    loadModalWindow: function () {
        if (getParameterByName('action') == 'create' ) {
            var content = <ActionPage />
            return (
                <ModalWindow content={content} parentPath={"/settings/action"} />
            )
        }
    },
});

module.exports = Actions;
