var React = require('react');
var $ = require('jquery');
var moment = require('moment');
var ServiceOptions = require('./ServiceOptions.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var ActionExecutorService = require('../../services/ActionExecutor');
var ActionStore = require('../../stores/ActionStore');
var ActionActions = require('../../actions/ActionActions');

var _action = {};

function getState (id, callback) {
	if (id) {
		ActionStore.getOne(id, function (doc) {
			callback({
				action: doc
			});
			_action = doc;
		});
	} else {
		callback({
			action: _action
		});
	}
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
}

function camelCaseToNormalForm(string) {
	var str = string
	    // insert a space before all caps
		.replace(/([A-Z])/g, ' $1')
	    // uppercase the first character
	    .replace(/^./, function(str){
			return str.toUpperCase();
		});
	return capitalizeFirstLetter(str);
}

var ActionExecutor = React.createClass({
    getInitalState: function () {
        return {
            action: '',
            pageIndex: '',
        }
    },

    componentWillMount: function () {
        getState(this.props.action._id, function (state) {
            this._action = state.action;
        	this.setState({
                action: state.action,
                pageIndex: 0,
            });
        }.bind(this));
    },

    componentDidMount: function() {
        ActionStore.addChangeListener(this.handleChange_ActionStore);
		$("#execute-action-" + this.state.action._id).fadeIn('slow');
    },

    componentWillUnmount: function() {
        ActionStore.removeChangeListener(this.handleChange_ActionStore);
    },

    getSteps: function () {
        var i = 0;
        return this.state.action.steps.map(function (step) {
            i++;
            var actionEvent = capitalizeFirstLetter(step.type + " " + step.entity);
            return (
                <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12 col-centered">
                    <div className="row" style={{padding:"3px 0"}}>
                        <div className="col-lg-1 col-md-2 col-sm-2 col-xs-3">
                            <span style={{width:"25px",height:"25px",fontSize:"18px",background:"#da383c",color:"#f1f4f6",display:"inline-block",textAlign:"center",verticalAlign:"middle",WebKitBorderRadius:"25px",borderRadius:"25px"}}>{i}</span>
                        </div>
                        <div className="col-lg-11 col-md-10 col-sm-10 col-xs-9" style={{backgroundColor:"#fff",padding:"2px 3px",fontSize:"18px"}}>
                            <span style={{fontWeight:"600"}}>{actionEvent + ": "}</span>
                            <span>{step.name}</span>
                        </div>
                    </div>
                </div>
            )
        });
    },

    getParameters: function () {
        return this.state.action.parameters.map(function (parameter) {
            var handleChange = function (event) {
                parameter.value = event.target.value;
                var action = this.state.action;
                for (var i = 0; i < action.parameters.length; i++) {
                    if (action.parameters[i]._id === parameter._id) {
                        action.parameters[i] = parameter;
                        return this.setState({
                            action: action
                        });
                    }
                }
            }.bind(this);

            var input;

            if (parameter.type.startsWith("lookup")) {
                var serviceKey = parameter.type.replace("lookup::","");
                input = (
                    <ServiceOptions serviceKey={serviceKey} value={parameter.value} onChange={handleChange} />
                )
            } else {
                input = (
                    <input style={{width:"100%"}} type="text" value={parameter.value} onChange={handleChange} />
                );
            }

			var required = "";
			if (parameter.required === true) {
				required = "*";
			}

            return (
                <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12 col-centered">
                    <div className="row" style={{padding:"3px 0"}}>
                        <span className="col-sm-12 col-xs-12 col-sm-12 col-xs-12 text-left">
							<span style={{color:"#da383c"}}>{required} </span>
							<span>{parameter.label}</span>
						</span>
                        <span className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            {input}
                        </span>
                    </div>
                </div>
            )
        }.bind(this));
    },

	getErrors: function () {
		if (this.state.errors) {
			var errors = this.state.errors.map(function (error) {
				return (
					<li>{error}</li>
				)
			});

			return (
				<div style={{padding:"5px 0", color:"#da383c"}}>
					<div className="col-lg-10 col-md-10 col-sm-12 col-xs-12 col-centered">
						<div style={{marginTop:"5px",paddingBottom:"5px",borderTop:"1px solid #ccc"}} />
						<div>{"Failed to execute. You have the following errors on the form:"}</div>
						<ul>{errors}</ul>
					</div>
				</div>
			)
		} else {
			return (
				<div></div>
			)
		}
	},

    render: function () {
        var pages = [];
        pages[0] = (
			<div style={{fontSize:"18px",backgroundColor:"#f1f4f6"}} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div style={{fontSize:"32px",fontWeight:"600",padding:"5px 0",color:"#0e2e47"}}>{this.state.action.name}</div>
                <div style={{padding:"5px 0"}}>{this.state.action.description}</div>
                <div style={{padding:"5px 0"}}>{"This action item will execute the following steps:"}</div>
                <div style={{padding:"5px 0"}}>{this.getSteps()}</div>
                <div style={{padding:"5px 0",float:"right"}}>
                    <ButtonSecondary label={"Cancel"} onClick={this.handleClick_Close} />
					<span style={{marginLeft:"5px"}} />
                    <ButtonPrimary label={"Next"} onClick={this.handleClick_Next} />
                </div>
			</div>
        );
        pages[1] = (
			<div style={{fontSize:"18px",backgroundColor:"#f1f4f6"}} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div style={{fontSize:"32px",fontWeight:"600",padding:"5px 0",color:"#0e2e47"}}>{this.state.action.name}</div>
                <div style={{padding:"5px 0"}}>{"In order to execute this action, please provide the requested contextual information below."}</div>
                <div style={{padding:"5px 0"}}>{this.getParameters()}</div>
				<div style={{padding:"5px 0"}}>
	                <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12 col-centered">
						<span style={{color:"#da383c"}}>* denotes required fields</span>
					</div>
				</div>
				{this.getErrors()}
                <div style={{padding:"5px 0",float:"right"}}>
                    <ButtonSecondary label={"Previous"} onClick={this.handleClick_Previous} />
					<span style={{marginLeft:"5px"}} />
                    <ButtonPrimary label={"Go ►"} onClick={this.handleClick_Go} />
                </div>
			</div>
        );
        pages[2] = (
			<div style={{fontSize:"18px",backgroundColor:"#f1f4f6"}} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div style={{fontSize:"32px",fontWeight:"600",padding:"5px 0",color:"#0e2e47"}}>{this.state.action.name}</div>
                <div style={{fontSize:"32px",color:"#666666",padding:"5px 0"}}>
					<img src="/img/wait" style={{height:"40px",paddingRight:"5px"}} />
					{"Executing..."}
				</div>
			</div>
        );
        pages[3] = (
			<div style={{fontSize:"18px",backgroundColor:"#f1f4f6"}} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div style={{fontSize:"32px",fontWeight:"600",padding:"5px 0",color:"#0e2e47"}}>
					{this.state.action.name}
	                <span style={{color:"#009933"}}>{" - Success!"}</span>
				</div>
	            <div style={{padding:"5px 0"}}>
					{"This action's steps were successfully executed. Awesome work!"}
				</div>
                <div style={{padding:"5px 0"}}>{this.getSteps()}</div>
                <div style={{padding:"5px 0",float:"right"}}>
                    <ButtonPrimary label={"Finish"} onClick={this.handleClick_Close} />
                </div>
			</div>
        );

        return (
			<div id={"execute-action-" + this.state.action._id} style={{display:"none"}}>
				{pages[this.state.pageIndex]}
			</div>
		)
    },

    handleClick_Close: function () {
		$("#execute-action-" + this.state.action._id).fadeOut('slow', function () {
        	this.props.handleClose();
		}.bind(this));
    },

    handleClick_Previous: function () {
        this.setState({
            action: this.state.action,
            pageIndex: 0,
        });
    },

    handleClick_Next: function () {
        this.setState({
            action: this.state.action,
            pageIndex: 1,
        });
    },

    handleClick_Go: function () {
		var errors = [];
		for (var i = 0; i < this.state.action.parameters.length; i++) {
			if (this.state.action.parameters[i].required === true && !this.state.action.parameters[i].value) {
				errors.push(camelCaseToNormalForm(this.state.action.parameters[i].name) + " field cannot be blank");
			} else if (this.state.action.parameters[i].type == "date") {
				var formats = [
				    "M/DD/YYYY",
					"M/D/YYYY",
				    "MM/D/YYYY",
				    "MM/DD/YYYY",
					"MMM DD, YYYY",
					"MMMM DD, YYYY",
					"MM-DD-YYYY",
					"YYYY-MM-DD"
				];
				if (moment(this.state.action.parameters[i].value, formats, true).isValid() === false) {
					errors.push(camelCaseToNormalForm(this.state.action.parameters[i].name) + " field is not in a recognizable date format");
				}
			}
		}

		if (errors.length > 0) {
			return this.setState({
				action: this.state.action,
				pageIndex: this.state.pageIndex,
				errors: errors
			});
		}

        var action = this.state.action;
        this.setState({
            action: this.state.action,
            pageIndex: 2,
        });
        new ActionExecutorService(action).execute();

		window.setTimeout(function () {
	        this.setState({
	            action: this.state.action,
	            pageIndex: 3,
	        });
		}.bind(this), 2000);
    },

    handleChange_ActionStore: function () {
        getState(this.props.id, function (state) {
            this._action = state.action;
        	this.setState({
                action: state.action,
                pageIndex: this.state.pageIndex,
            });
        }.bind(this));
    },
});

module.exports = ActionExecutor;
