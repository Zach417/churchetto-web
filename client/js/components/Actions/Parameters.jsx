var React = require('react');
var Style = require('./Style.jsx');
var Parameter = require('./Parameter.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;

var Steps = React.createClass({
	componentWillMount: function () {
		this._action = this.props.action;
		if (!this._action.parameters) {
			this._action.parameters = [];
		}
	},

    render: function () {
        var parameters = (
            <div style={{padding:"10px 5px",margin:"10px 0",backgroundColor:"#ccc",borderLeft:"3px solid #666666"}} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<div className="container-fluid">
					<div className="row">
						<div className="row-fluid">
							<span className="col-lg-4 col-md-4 hidden-sm hidden-xs"></span>
							<span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
								<div>{"No parameters have been added to this action item"}</div>
							</span>
						</div>
					</div>
				</div>
			</div>
		);

        if (this.props.action.parameters && this.props.action.parameters.length > 0) {
            parameters = this.props.action.parameters.map(function (doc) {
                return (
                    <Parameter key={doc._id} parameter={doc} handleChange={this.handleChange_Parameter} handleRemove={this.handleClick_Remove} />
                )
            }.bind(this));
        }

        return (
            <div className="container-fluid" style={{margin:"0",padding:"0"}}>
                <div className="row">
                    <div className="row-fluid">
                        <span style={{margin:"5px 0",fontSize:"22px"}} className="col-lg-8 col-md-8 col-sm-6 col-xs-6"><b>{"Parameters"}</b></span>
                        <span style={{margin:"5px 0"}} className="col-lg-4 col-md-4 col-sm-6 col-xs-6">
                            <span style={{float:"right",cursor:"pointer"}}>
								<ButtonPrimary label={"Add"} onClick={this.handleClick_Add} />
							</span>
                        </span>
                    </div>
                    <div className="row-fluid">
	                	{parameters}
                    </div>
                </div>
            </div>
        )
    },

	handleChange_Parameter: function (parameter) {
		for (var i = 0; i < this.props.action.parameters.length; i++) {
			if (this.props.action.parameters[i]._id === parameter._id) {
				this._action.parameters[i] = parameter;
				return this.props.handleChange(this._action);
			}
		}
	},

	handleClick_Remove: function (parameter) {
		for (var i = 0; i < this.props.action.parameters.length; i++) {
			if (this.props.action.parameters[i]._id === parameter._id) {
				this._action.parameters.splice(i, 1);
				return this.props.handleChange(this._action);
			}
		}
	},

	handleClick_Add: function () {
		var id = Math.floor(Math.random() * (1000000000 - 0)) + 0;
		this._action.parameters.push({_id:id});
		return this.props.handleChange(this._action);
	},
});

module.exports = Steps;
