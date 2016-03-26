var React = require('react');

var TaskTypeStore = require('../../stores/TaskTypeStore');
var TaskTypeActions = require('../../actions/TaskTypeActions');

var Style = require('./Style.jsx');
var TaskCategoryOptions = require('./TaskCategoryOptions.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;

var _taskType = {};

function getState (id, callback) {
	if (id) {
		TaskTypeStore.getOne(id, function (doc) {
			callback({
				taskType: doc
			});
			_taskType = doc;
		});
	} else {
		callback({
			taskType: _taskType
		});
	}
}

var Task = React.createClass({
    getInitialState: function() {
    	_taskType = {};

        return {
        	taskType: ''
        }
    },

    componentWillMount: function () {
        getState(this.props.id, function (state) {
        	this.setState(state);
        }.bind(this));
    },

    componentDidMount: function() {
        TaskTypeStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TaskTypeStore.removeChangeListener(this._onChange);
    },

	render: function () {
		return (
			<div style={Style.container} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		        <div className="col-lg-12 col-md-12 hidden-sm hidden-xs">
	                <div className="container-fluid">
	                    <div className="row">
	                        <div className="row-fluid">
	                            <span style={Style.label} className="col-lg-4 col-md-4 hidden-sm hidden-xs text-right">Name</span>
	                            <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Name</span>
	                        	<span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
	                        		<input style={Style.input} type="text" value={this.state.taskType.name} onChange={this.handleChangeName} />
	                        	</span>
	                        </div>
	                        <div className="row-fluid padding-top-15">
	                            <span className="col-lg-4 col-md-4 hidden-sm hidden-xs text-right">Task Category</span>
	                            <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Task Category</span>
	                            <span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                	<TaskCategoryOptions value={this.state.taskType.taskCategoryId} handleChange={this.handleChangeTaskCategoryId} />
	                            </span>
	                        </div>
	                        <div className="row-fluid padding-top-15">
	                            <span className="col-lg-4 col-md-4 hidden-sm hidden-xs text-right">Purpose</span>
	                            <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Purpose</span>
	                            <span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
	                                <textarea style={Style.textArea} value={this.state.taskType.purpose} onChange={this.handleChangePurpose} />
	                            </span>
	                        </div>
	                        <div className="row-fluid padding-top-15">
	                            <span className="col-lg-4 col-md-4 hidden-sm hidden-xs text-right">Process</span>
	                            <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Process</span>
	                            <span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
	                                <textarea style={Style.textArea} value={this.state.taskType.process} onChange={this.handleChangeProcess} />
	                            </span>
	                        </div>
	                        <div className="row-fluid padding-top-15">
	                            <span className="col-lg-4 col-md-4 hidden-sm hidden-xs text-right">Outcomes</span>
	                            <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Outcomes</span>
	                            <span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
	                                <textarea style={Style.textArea} value={this.state.taskType.outcomes} onChange={this.handleChangeOutcomes} />
	                            </span>
	                        </div>
	                    </div>
	                </div>
	                <div className="container-fluid" style={{margin:"0",padding:"0"}}>
	                    <div className="row" style={{margin:"0",padding:"0"}}>
	                        <div className="row-fluid padding-top-05">
	                            <span className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<div style={{float:"right"}}>
					                    <ButtonSecondary label={"Cancel"} onClick={this.handleClickClose} />
										<span style={{marginLeft:"5px"}} />
					                    <ButtonPrimary label={"Save"} onClick={this.handleClickSave} />
									</div>
	                            </span>
	                        </div>
	                    </div>
	                </div>
	            </div>
			</div>
		)
	},

	_onChange: function () {
        getState(this.props.id, function (state) {
        	this.setState(state);
        }.bind(this));
	},

	handleChangeName: function (event) {
		_taskType.name = event.target.value;
        this.setState({ taskType: _taskType });
	},

	handleChangePurpose: function (event) {
		_taskType.purpose = event.target.value;
        this.setState({ taskType: _taskType });
	},

	handleChangeProcess: function (event) {
		_taskType.process = event.target.value;
        this.setState({ taskType: _taskType });
	},

	handleChangeOutcomes: function (event) {
		_taskType.outcomes = event.target.value;
        this.setState({ taskType: _taskType });
	},

	handleChangeTaskCategoryId: function (event) {
		_taskType.taskCategoryId = event.target.value;
        this.setState({ taskType: _taskType });
	},

	handleClickSave: function () {
		if (this.props.id) {
			TaskTypeActions.update(this.state.taskType);
		} else {
			TaskTypeActions.create(this.state.taskType);
		}

        this.props.handleClose();
	},

    handleClickClose: function () {
        this.props.handleClose();
    },
});

module.exports = Task;
