var React = require('react');
var browserHistory = require('react-router').browserHistory;
var $ = require('jquery');
var S = require('string');
var moment = require('moment');

var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;

var PlanStore = require('../../stores/PlanStore');
var TaskStore = require('../../stores/TaskStore');
var TaskActions = require('../../actions/TaskActions');

var TaskTypeOptions = require('./TaskTypeOptions.jsx');
var PlanOptions = require('./PlanOptions.jsx');
var OwnerOptions = require('./OwnerOptions.jsx');

var _task = {};
var _initializing = true;
var _existing = false;

function getTaskState (task) {
    if (task) {
        _task = task;
        _initializing = false;
        _existing = true;
    } else {
        throw new Error("Null reference exception.");
    }

    if (task.dateDue) {
        var dateDue = new Date(task.dateDue);
        task.dateDue = moment(dateDue).format('MM/DD/YYYY');
    }

    if (task.dateCompleted) {
        var dateCompleted = new Date(task.dateCompleted);
        task.dateCompleted = moment(dateCompleted).format('MM/DD/YYYY');
    }

    return {
        task: task
    };
}

var Details = React.createClass({
	getInitialState: function () {
        _task = {};
        _initializing = true;
        _existing = false;

		return {
			task: {
                _id: '',
				name: '',
                planId: '',
                taskType: '',
                dateDue: '',
			}
		}
	},

	componentWillMount: function () {
        if (this.props.task) {
            var state = getTaskState(this.props.task);
            this.setState(state);
        } else if (this.props.id) {
            TaskStore.getOne(this.props.id, function(result) {
                var state = getTaskState(result);
                this.setState(state);
            }.bind(this));
        } else {
            _existing = false
        }
	},

	render: function () {
		return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="row-fluid">
                            <span style={Style.label} className="col-lg-4 col-md-4 hidden-sm hidden-xs text-right">Name</span>
                            <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Name</span>
                        	<span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                        		<input style={Style.input} type="text" value={this.state.task.name} onChange={this.handleNameChange} />
                        	</span>
                        </div>
                        <div className="row-fluid padding-top-15">
                            <span className="col-lg-4 col-md-4 hidden-sm hidden-xs text-right">Plan</span>
                            <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Plan</span>
                            <span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                <PlanOptions value={this.state.task.planId} handleChange={this.handlePlanChange} />
                            </span>
                        </div>
                        <div className="row-fluid padding-top-15">
                            <span className="col-lg-4 col-md-4 hidden-sm hidden-xs text-right">Task Type</span>
                            <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Task Type</span>
                        	<span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                <TaskTypeOptions value={this.state.task.taskTypeId} handleChange={this.handleChangeTaskTypeId} />
                        	</span>
                        </div>
                        <div className="row-fluid padding-top-15">
                            <span className="col-lg-4 col-md-4 hidden-sm hidden-xs text-right">Owner</span>
                            <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Owner</span>
                            <span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                <OwnerOptions value={this.state.task.ownerId} handleChange={this.handleOwnerChange} />
                            </span>
                        </div>
                        <div className="row-fluid padding-top-15">
                            <span className="col-lg-4 col-md-4 hidden-sm hidden-xs text-right">Date Due</span>
                            <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Date Due</span>
                            <span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                <input style={Style.input} type="text" value={this.state.task.dateDue} onChange={this.handleDateDueChange} />
                            </span>
                        </div>
                        <div className="row-fluid padding-top-15">
                            <span className="col-lg-4 col-md-4 hidden-sm hidden-xs text-right">Date Comp.</span>
                            <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Date Comp.</span>
                            <span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                <input style={Style.input} type="text" value={this.state.task.dateCompleted} onChange={this.handleDateCompletedChange} />
                            </span>
                        </div>
                        <div className="row-fluid padding-top-15">
                            <span className="col-lg-4 col-md-4 hidden-sm hidden-xs text-right">Comp. By</span>
                            <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Comp. By</span>
                            <span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                <input style={Style.input} type="text" />
                            </span>
                        </div>
                        <div className="row-fluid padding-top-15">
                            <span className="col-lg-4 col-md-4 hidden-sm hidden-xs text-right">Details</span>
                            <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Details</span>
                            <span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                <textarea style={Style.textArea} value={this.state.task.description} onChange={this.handleDetailsChange} />
                            </span>
                        </div>
                    </div>
                </div>
                <div className="container-fluid" style={{margin:"0",padding:"0"}}>
                    <div className="row" style={{margin:"0",padding:"0"}}>
                        <div className="row-fluid padding-top-05">
                            <span className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div style={{float:"right"}}>
                                    <ButtonSecondary label={"Cancel"} onClick={this.handleClose} />
                                    <span style={{marginLeft:"5px"}} />
                                    <ButtonSecondary label={"Complete"} onClick={this.handleClickComplete} />
                                    <span style={{marginLeft:"5px"}} />
                                    <ButtonPrimary label={"Save"} onClick={this.handleSave} />
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
		)
	},

    handleClickComplete: function () {
        this.handleClose();
        browserHistory.push(window.location.pathname + "?action=complete-task&id=" + this.state.task._id);
    },

    handleSave: function () {
        if (!S(this.state.task.dateDue).isEmpty() && !moment(this.state.task.dateDue, 'MM/DD/YYYY').isValid()) {
            alert('Date due is not in a recognizable date format');
            return;
        }

        if (_existing) {
            TaskActions.update(this.state.task);
        } else {
            TaskActions.create(this.state.task);
        }
        this.handleClose();
    },

    handleClose: function () {
        this.props.handleClose();
    },

	handleNameChange: function (event) {
		_task.name = event.target.value;
        this.setState({ task: _task });
	},

    handlePlanChange: function (event) {
        _task.planId = event.target.value;
        this.setState({ task: _task });
    },

    handleChangeTaskTypeId: function (event) {
        _task.taskTypeId = event.target.value;
        this.setState({ task: _task });
    },

    handleOwnerChange: function (event) {
        _task.ownerId = event.target.value;
        this.setState({ task: _task });
    },

    handleTypeChange: function (event) {
        _task.taskType = event.target.value;
        this.setState({ task: _task });
    },

    handleDateDueChange: function (event) {
        _task.dateDue = event.target.value;
        this.setState({ task: _task });

        if (!moment(this.state.task.dateDue,'MM/DD/YYYY').isValid()) {
            $(event.target).css("border-color", "#da383c");
        } else {
            $(event.target).css("border-color", "");
        }
    },

    handleDateCompletedChange: function (event) {
        _task.dateCompleted = event.target.value;
        this.setState({ task: _task });

        if (!moment(this.state.task.dateCompleted,'MM/DD/YYYY').isValid()) {
            $(event.target).css("border-color", "#da383c");
        } else {
            $(event.target).css("border-color", "");
        }
    },

    handleDetailsChange: function (event) {
        _task.description = event.target.value;
        this.setState({ task: _task });
    },
});

module.exports = Details;
