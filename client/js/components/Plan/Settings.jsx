var React = require('react');
var browserHistory = require('react-router').browserHistory;

var PlanActions = require('../../actions/PlanActions.js');
var PlanStore = require('../../stores/PlanStore.js');

var Style = require('./Style.jsx');

function getPlanProfileState(id, callback) {
    PlanStore.getOne(id, function (json) {
        callback({
            plan: json
        });
    })
}

var PlanSettings = React.createClass({
    getInitialState: function() {
        return {
            plan: {
                _id: '',
                name: '',
                planType: '',
                description: ''
            }
        }
    },

    componentWillMount: function () {
        getPlanProfileState(this.props.params.id, function (state) {
            this.setState(state);
        }.bind(this));
    },

    componentDidMount: function() {
        PlanStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        PlanStore.removeChangeListener(this._onChange);
    },

    render: function(){
        return (
            <div>
                <div className="container-fluid" style={Style.heading}>
                    <div className="row">
                        <span className="text-uppercase">Plan Settings</span>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="row-fluid padding-top-15">
                            <span className="col-lg-3 col-md-3 hidden-sm hidden-xs text-right">Name</span>
                            <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Name</span>
                        	<span className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                        		<input style={Style.input} type="text" value={this.state.plan.name} onChange={this.handleNameChange} />
                        	</span>
                            <span className="col-lg-2 col-md-2 hidden-sm hidden-xs" />
                        </div>
                        <div className="row-fluid padding-top-15">
                            <span className="col-lg-3 col-md-3 hidden-sm hidden-xs text-right">Type</span>
                            <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Type</span>
                            <span className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                                <input style={Style.input} type="text" value={this.state.plan.planType} onChange={this.handleTypeChange} />
                            </span>
                            <span className="col-lg-2 col-md-2 hidden-sm hidden-xs" />
                        </div>
                        <div className="row-fluid padding-top-15">
                            <span className="col-lg-3 col-md-3 hidden-sm hidden-xs text-right">Description</span>
                            <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Description</span>
                            <span className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                                <textarea style={Style.textArea} value={this.state.plan.description} onChange={this.handleDescriptionChange}></textarea>
                            </span>
                            <span className="col-lg-2 col-md-2 hidden-sm hidden-xs" />
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row-fluid padding-top-05">
                        <span className="col-lg-3 col-md-3 col-sm-12 col-xs-12"></span>
                        <span className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                            <div className="btn btn-primary" style={Style.saveButton} onClick={this.saveChanges}>Save</div>
                            <div className="btn btn-default" onClick={this.cancelChanges}>Cancel</div>
                        </span>
                        <span className="col-lg-2 col-md-2 hidden-sm hidden-xs" />
                    </div>
                </div>
            </div>
        )
    },

    saveChanges: function() {
    	PlanActions.savePlan(this.state.plan);
        browserHistory.push("/plan/" + this.state.plan._id);
    },

    cancelChanges: function() {
        if (confirm('Are you sure you wish to cancel? You will lose unsaved changes.')) {
            getPlanProfileState(this.props.params.id, function (state) {
                this.setState(state);
                browserHistory.push("/plan/" + this.state.plan._id);
            }.bind(this));
        }
    },

	handleNameChange: function(event) {
		this.setState({
			plan: {
				_id: this.state.plan._id,
				name: event.target.value,
				planType: this.state.plan.planType,
                description: this.state.plan.description
			}
		});
	},

	handleTypeChange: function(event) {
		this.setState({
			plan: {
				_id: this.state.plan._id,
				name: this.state.plan.name,
				planType: event.target.value,
                description: this.state.plan.description
			}
		});
	},

    handleDescriptionChange: function(event) {
        this.setState({
            plan : {
                _id: this.state.plan._id,
                name: this.state.plan.name,
                planType: this.state.plan.planType,
                description: event.target.value
            }
        });
    },

    _onChange: function() {
        getPlanProfileState(this.state.plan._id, function (state) {
            this.setState(state);
        }.bind(this));
    }
});

module.exports = PlanSettings;
