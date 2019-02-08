var React = require('react');
var $ = require('jquery');
var moment = require('moment');
var browserHistory = require('react-router').browserHistory;

var TaskCategoryStore = require('../../stores/TaskCategoryStore.js');
var TaskTypeStore = require('../../stores/TaskTypeStore.js');
var FeedItemConstants = require('../../constants/FeedItemConstants.js');

var Style = require('./Style.jsx');

var Actions = require('./Actions.jsx');
var Task = require('./Task.jsx');
var TaskActions = require('./TaskActions.jsx');
var Meeting = require('./Meeting.jsx');
var MeetingActions = require('./MeetingActions.jsx');
var Document = require('./Document.jsx');
var DocumentActions = require('./DocumentActions.jsx');

var TaskDetails = require('../Task/Index.jsx');
var ModalWindow = require('../ModalWindow/Index.jsx');

function getComponentId(object, type) {
    return "feed-item-" + type + "-" + object._id;
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getState(obj, type, callback) {

    if (type === FeedItemConstants.TASK) {

        if (!obj.taskTypeId) {
            return callback({});
        }

        TaskTypeStore.getOne(obj.taskTypeId, function (taskType) {
            TaskCategoryStore.getOne(taskType.taskCategoryId, function (taskCategory) {
                return callback({ iconSrc: taskCategory.icon });
            });
        });

    }

}

function getId (props) {
    if (props.object && props.type) {
        return "#feed-item-" + props.type + "-"+ props.object._id;
    } else if (props.obj) {
        return "#feed-item-no-type-" + props.object._id;
    } else if (props.heading) {
        return "#feed-item-" + props.heading.replace(" ", "-").replace("(","").replace(")","");
    } else {
        return "#feed-item-no-data";
    }
}

var FeedItem = React.createClass({
    getInitialState: function () {
        return {
            iconSrc: '',
            isDeleted: '',
        }
    },

    componentWillMount: function () {
        if (this.props.iconSrc) {
            return this.setState({
                iconSrc: this.props.iconSrc,
                isDeleted: false,
            });
        }

        getState(this.props.object, this.props.type, function (state) {
            this.setState({
                iconSrc: state.iconSrc,
                isDeleted: false,
            });
        }.bind(this));
    },

    componentWillReceiveProps: function () {
        getState(this.props.object, this.props.type, function (state) {
            this.setState({
                iconSrc: state.iconSrc,
                isDeleted: false,
            });
        }.bind(this));
    },

    render: function () {
        if (this.state.isDeleted === true) {
            return (
                <div></div>
            )
        }

        return (
            <span id={getId(this.props)}>
                <div style={Style.container}>
                    <div className="container-fluid" style={Style.headingContainer}>
                        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-2" style={{padding:"0"}}>{this.getIcon()}</div>
                        <div className="col-lg-10 col-md-10 col-sm-10 col-xs-9" style={Style.labelContainer}>
                            <div style={{padding:"0",margin:"0",color:"#0e2e47",verticalAlign:"top",textAlign:"left",wordWrap: "normal",whiteSpace: "normal"}} className="btn btn-link" onClick={this.handleLabelClick}>
                                <b>{this.getHeading()}</b>
                            </div>
                            {this.getSubHeading()}
                        </div>
                        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1" style={{padding:"0",textAlign:"right"}}>
                            <div style={Style.downContainer} className="btn btn-link" onClick={this.handleClickDown}>
                                {"▼"}
                            </div>
                        </div>
                    </div>
                    <div id={getComponentId(this.props.object, this.props.type)} style={{display:"none"}}>
                        <div style={Style.bodyContainer}>
                            <div>
                                {this.getFeedItemBody()}
                            </div>
                        </div>
                    </div>
                    <div style={Style.actionContainer}>
                        {this.getFeedItemActions()}
                    </div>
                </div>
                {this.loadModalWindow()}
            </span>
        )
    },

    getIcon: function () {
        if (this.state.iconSrc && this.state.iconSrc != '') {
            return (
                <span style={Style.iconContainer}>{this.state.iconSrc}</span>
            );
        }
    },

    getHeading: function () {
        if (this.props.heading) {
            return this.props.heading;
        }

        var heading;

        switch(this.props.type)
        {
            case FeedItemConstants.TASK:
                heading = this.props.object.name;
                break;

            case FeedItemConstants.MEETING:
                break;

            case FeedItemConstants.DOCUMENT:
                break;
        }

        return heading;
    },

    getSubHeading: function () {
        if (this.props.subHeading) {
            return (
                <div style={{padding:"0",margin:"0",verticalAlign:"top"}}>
                    {this.props.subHeading}
                </div>
            );
        }

        var heading;

        switch(this.props.type)
        {
            case FeedItemConstants.TASK:
                if (this.props.object.dateDue) {
                    var today = new Date();
                    var dateDue = new Date(this.props.object.dateDue)
                    if (dateDue <= today) {
                        heading = (
                            <span style={{color:"#da383c"}}><b>{moment(this.props.object.dateDue).format("MMM D, YYYY")}</b></span>
                        )
                    } else {
                        heading = (
                            <span>{moment(this.props.object.dateDue).format("MMM D, YYYY")}</span>
                        )
                    }
                } else {
                    heading = (
                        <span>{"No due date."}</span>
                    )
                }
                break;

            case FeedItemConstants.MEETING:
                break;

            case FeedItemConstants.DOCUMENT:
                break;
        }

        return (
            <div style={{padding:"0",margin:"0",verticalAlign:"top"}}>
                {heading}
            </div>
        );
    },

    getFeedItemBody: function () {
        if (this.props.body) {
            return (this.props.body);
        }

        switch(this.props.type)
        {
            case FeedItemConstants.TASK:
                return <Task task={this.props.object} />
                break;

            case FeedItemConstants.MEETING:
                return <Meeting meeting={this.props.object} />
                break;

            case FeedItemConstants.DOCUMENT:
                return <Document document={this.props.object} />
                break;
        }
    },

    getFeedItemActions: function () {
        if (this.props.actions && this.props.actions.length > 0) {
            var actionItems = [];

            for (var i = 0; i < this.props.actions.length; i++) {
                var action = this.props.actions[i];

                var handleClick_ActionDelete = function () {
                    action.handleClick();
                    this.handleClick_Delete();
                }.bind(this);

                switch (action.type) {
                    case "open":
                        var OpenAction = Actions.Open;
                        actionItems.push(<OpenAction handleClick={action.handleClick} />);
                        break;
                    case "delete":
                        var DeleteAction = Actions.Delete;
                        actionItems.push(<DeleteAction handleClick={handleClick_ActionDelete} />);
                        break;
                }
            }

            return (
                <div>
                    {actionItems}
                </div>
            )
        }

        switch(this.props.type) {
            case FeedItemConstants.TASK:
                return <TaskActions task={this.props.object} handleDelete={this.handleClick_Delete} />
                break;

            case FeedItemConstants.MEETING:
                return <MeetingActions meeting={this.props.object} handleDelete={this.handleClick_Delete} />
                break;

            case FeedItemConstants.DOCUMENT:
                return <DocumentActions document={this.props.object} handleDelete={this.handleClick_Delete} />
                break;
        }
    },

    handleClickDown: function () {
        $("#" + getComponentId(this.props.object, this.props.type)).slideToggle("fast");
    },

    handleLabelClick: function () {
        browserHistory.push(this.props.linkPath);
    },

    // makes sure the item is immediately removed when delete is clicked
    handleClick_Delete: function () {
        this.setState({
            iconSrc: this.state.iconSrc,
            isDeleted: true,
        });
    },

    loadModalWindow: function () {
        if (!this.props.object) {
            return;
        } else if (!this.props.object._id) {
            return;
        }

        if (getParameterByName('action') == 'open-task' && getParameterByName('id') == this.props.object._id) {
            var id = getParameterByName('id');
            var content = <TaskDetails id={id} />
            return (
                <ModalWindow content={content} parentPath={this.props.linkPath.split("?")[0]} />
            )
        }
    },
});

module.exports = FeedItem;
