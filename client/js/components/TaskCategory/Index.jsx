var React = require('react');

var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;

var TaskCategoryStore = require('../../stores/TaskCategoryStore');
var TaskCategoryActions = require('../../actions/TaskCategoryActions');

var _taskCategory = {};

function getState (id, callback) {
	if (id) {
		TaskCategoryStore.getOne(id, function (doc) {
			callback({
				taskCategory: doc
			});
			_taskCategory = doc;
		});
	} else {
		callback({
			taskCategory: _taskCategory
		});
	}
}

var Task = React.createClass({
    getInitialState: function() {
    	_taskCategory = {};

        return {
        	taskCategory: ''
        }
    },

    componentWillMount: function () {
        getState(this.props.id, function (state) {
        	this.setState(state);
        }.bind(this));
    },

    componentDidMount: function() {
        TaskCategoryStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TaskCategoryStore.removeChangeListener(this._onChange);
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
	                        		<input style={Style.input} type="text" value={this.state.taskCategory.name} onChange={this.handleChangeName} />
	                        	</span>
	                        </div>
							<div className="row-fluid padding-top-15">
	                            <span style={Style.label} className="col-lg-4 col-md-4 hidden-sm hidden-xs text-right">Icon</span>
	                            <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Icon</span>
	                        	<span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
	                        		<input style={Style.input} type="text" value={this.state.taskCategory.icon} onChange={this.handleChangeIcon} />
	                        	</span>
	                        </div>
	                        <div className="row-fluid padding-top-15">
	                            <span className="col-lg-4 col-md-4 hidden-sm hidden-xs text-right">Description</span>
	                            <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Description</span>
	                            <span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
	                                <textarea style={Style.textArea} value={this.state.taskCategory.description} onChange={this.handleChangeDescription} />
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
		_taskCategory.name = event.target.value;
        this.setState({ taskCategory: _taskCategory });
	},

	handleChangeIcon: function (event) {
		_taskCategory.icon = event.target.value;
        this.setState({ taskCategory: _taskCategory });
	},

	handleChangeDescription: function (event) {
		_taskCategory.description = event.target.value;
        this.setState({ taskCategory: _taskCategory });
	},

	handleClickSave: function () {
		if (this.props.id) {
			TaskCategoryActions.update(this.state.taskCategory);
		} else {
			TaskCategoryActions.create(this.state.taskCategory);
		}

		this.props.handleClose();
	},

    handleClickClose: function () {
        this.props.handleClose();
    },
});

module.exports = Task;
