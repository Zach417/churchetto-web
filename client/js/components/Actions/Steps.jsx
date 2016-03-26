var React = require('react');
var Style = require('./Style.jsx');
var Step = require('./Step.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;

var Steps = React.createClass({
    componentWillMount: function () {
		this._action = this.props.action;
		if (!this._action.steps) {
			this._action.steps = [];
		}
    },

    render: function () {
        var steps = (
            <div style={{padding:"10px 5px",margin:"10px 0",backgroundColor:"#ccc",borderLeft:"3px solid #666666"}} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<div className="container-fluid">
					<div className="row">
						<div className="row-fluid">
							<span className="col-lg-4 col-md-4 hidden-sm hidden-xs"></span>
							<span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
								<div>{"No steps have been added to this action item"}</div>
							</span>
						</div>
					</div>
				</div>
			</div>
		);

        if (this.props.action.steps && this.props.action.steps.length > 0) {
            steps = this.props.action.steps.map(function (doc) {
                return (
                    <Step key={doc._id} step={doc} handleChange={this.handleChange_Step} handleRemove={this.handleClick_Remove} />
                )
            }.bind(this));
        }

        return (
            <div className="container-fluid" style={{margin:"0",padding:"0"}}>
                <div className="row">
                    <div className="row-fluid">
                        <span style={{margin:"5px 0",fontSize:"22px"}} className="col-lg-8 col-md-8 col-sm-6 col-xs-6"><b>{"Steps"}</b></span>
                        <span style={{margin:"5px 0"}} className="col-lg-4 col-md-4 col-sm-6 col-xs-6">
                            <span style={{float:"right",cursor:"pointer"}}>
								<ButtonPrimary label={"Add"} onClick={this.handleClick_Add} />
							</span>
                        </span>
                    </div>
                    <div className="row-fluid">
                        {steps}
                    </div>
                </div>
            </div>
        )
    },

	handleChange_Step: function (step) {
		for (var i = 0; i < this._action.steps.length; i++) {
			if (this._action.steps[i]._id === step._id) {
				this._action.steps[i] = step;
				return this.props.handleChange(this._action);
			}
		}
	},

	handleClick_Remove: function (step) {
		for (var i = 0; i < this._action.steps.length; i++) {
			if (this._action.steps[i]._id === step._id) {
				this._action.steps.splice(i, 1);
				return this.props.handleChange(this._action);
			}
		}
	},

	handleClick_Add: function () {
		var id = Math.floor(Math.random() * (1000000000 - 0)) + 0;
		this._action.steps.push({_id:id});
		return this.props.handleChange(this._action);
	}
});

module.exports = Steps;
