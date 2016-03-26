var React = require('react');
var moment = require('moment');
var TaskStore = require('../../stores/TaskStore.js');
var TaskTypeStore = require('../../stores/TaskTypeStore.js');

function formatDate(date) {
	if (!date) {
		return '';
	}

	return moment(date).format("MMMM Do, YYYY");
}

function getTaskType(_id, callback) {
	TaskTypeStore.getOne(_id, function (taskType) {
		callback(taskType);

		switch(taskType.taskCategoryId){
			case "56bcb5351f3d76082bb8ef7f":
				callback("an investment");
				break;
			case "56bcb5511f3d76082bb8ef80":
				callback("a vendor");
				break;
			case "56bcb3a5777f0d4c1cb43982":
				callback("an administration");
				break;
			default:
				callback();
				break;
		}
	});
}

function getState(task, callback) {

	if (!task.taskTypeId) {
		return callback();
	}

	TaskTypeStore.getOne(task.taskTypeId, function (taskType) {

		var purpose = (
			<div className="row-fluid"></div>
		);

		if (taskType.purpose) {
			purpose = (
				<div className="row-fluid">
					<div className="col-lg-2 col-md-3 col-sm-12 col-xs-12"><b>Purpose</b></div>
					<div className="col-lg-10 col-md-9 col-sm-12 col-xs-12">{taskType.purpose}</div>
					<div style={{height:"5px"}} className="col-lg-12 col-md-12 col-sm-12 col-xs-12"></div>
				</div>
			);
		}

		var process = (
			<div className="row-fluid"></div>
		);

		if (taskType.process) {
			process = (
				<div className="row-fluid">
					<div className="col-lg-2 col-md-3 col-sm-12 col-xs-12"><b>Process</b></div>
					<div className="col-lg-10 col-md-9 col-sm-12 col-xs-12">{taskType.process}</div>
					<div style={{height:"5px"}} className="col-lg-12 col-md-12 col-sm-12 col-xs-12"></div>
				</div>
			);
		}

		var outcomes = (
			<div className="row-fluid"></div>
		);

		if (taskType.outcomes) {
			outcomes = (
				<div className="row-fluid">
					<div className="col-lg-2 col-md-3 col-sm-12 col-xs-12"><b>Outcomes</b></div>
					<div className="col-lg-10 col-md-9 col-sm-12 col-xs-12">{taskType.outcomes}</div>
					<div style={{height:"5px"}} className="col-lg-12 col-md-12 col-sm-12 col-xs-12"></div>
				</div>
			);
		}

		return callback(
			<div className="container-fluid" style={{padding:"5px 0",margin:"0"}}>
				{purpose}
				{process}
				{outcomes}
			</div>
		);
	});
}

var FeedItemTask = React.createClass({
	getInitialState: function () {
		return {
			detail: 'Loading details...'
		}
	},

	componentWillMount: function () {
		getState(this.props.task, function (detail) {
			this.setState({detail:detail});
		}.bind(this));
	},

    componentDidMount: function() {
        TaskStore.addChangeListener(this.handleStoreChangeTask);
    },

    componentWillUnmount: function() {
        TaskStore.removeChangeListener(this.handleStoreChangeTask);
    },

    render: function(){
        return (
			<div className="row-fluid">
				{this.state.detail}
			</div>
		);
    },

	handleStoreChangeTask: function () {
		getState(this.props.task, function (detail) {
			this.setState({detail:detail});
		}.bind(this));
	}
});

module.exports = FeedItemTask;
