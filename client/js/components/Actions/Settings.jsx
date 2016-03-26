var React = require('react');

var Style = require('./Style.jsx');
var Parameters = require('./Parameters.jsx');
var Steps = require('./Steps.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var NavigationItem = require('../Navigation/Item.jsx');
var ActionStore = require('../../stores/ActionStore');
var ActionActions = require('../../actions/ActionActions');

var Action = React.createClass({
    getInitialState: function() {
    	this._action = {};

        return {
        	action: '',
			pageIndex: '',
        }
    },

    componentWillMount: function () {
        this.getState(this.props.id, function (state) {
        	this.setState({
				action: state.action,
				pageIndex: 0,
			});
        }.bind(this));
    },

    componentDidMount: function() {
        ActionStore.addChangeListener(this.handleChange_ActionStore);
    },

    componentWillUnmount: function() {
        ActionStore.removeChangeListener(this.handleChange_ActionStore);
        this._action = {};
    },

	render: function () {
		pages = [];
		pages[0] = (
            <div className="container-fluid" style={{margin:"0",padding:"0"}}>
                <div className="row">
                    <div className="row-fluid">
                        <span style={{margin:"5px 0",fontSize:"22px"}} className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><b>{"Details"}</b></span>
                    </div>
                    <div className="row-fluid">
                        <div style={{padding:"10px 5px",margin:"10px 0",backgroundColor:"#ccc",borderLeft:"3px solid #666666"}} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="container-fluid" style={{margin:"0",padding:"0"}}>
                                <div className="row" style={{margin:"0",padding:"0"}}>
                                    <div className="row-fluid">
                                        <span className="col-lg-4 col-md-4 hidden-sm hidden-xs text-right">Name</span>
                                        <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Name</span>
                                        <span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                            <input style={Style.input} type="text" value={this.state.action.name} onChange={this.handleChange_Name} />
                                        </span>
                                    </div>
                                    <div className="row-fluid padding-top-15">
                                        <span className="col-lg-4 col-md-4 hidden-sm hidden-xs text-right">Description</span>
                                        <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Description</span>
                                        <span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                            <textarea style={Style.textArea} value={this.state.action.description} onChange={this.handleChange_Description} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		);

		pages[1] = (
			<Parameters action={this.state.action} handleChange={this.handleChange_Action} />
		);

		pages[2] = (
			<Steps action={this.state.action} handleChange={this.handleChange_Action} />
		);

		return (
			<div style={Style.container} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		        <div style={{margin:"0",padding:"0"}} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div className="container-fluid" style={{margin:"0",padding:"0"}}>
						<div className="row" style={{margin:"0",padding:"0"}}>
							<div className="row-fluid">
	                            <span className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
									<NavigationItem label={"Details"} isSelected={false} handleClick={this.handleClick_ActionDetails} />
									<NavigationItem label={"Parameters"} isSelected={false} handleClick={this.handleClick_Parameters} />
									<NavigationItem label={"Steps"} isSelected={false} handleClick={this.handleClick_Steps} />
								</span>
	                            <span className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
									{pages[this.state.pageIndex]}
								</span>
							</div>
						</div>
					</div>
	                <div className="container-fluid" style={{margin:"0",padding:"0"}}>
	                    <div className="row" style={{margin:"0",padding:"0"}}>
	                        <div className="row-fluid padding-top-05">
	                            <span className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<div style={{float:"right"}}>
					                    <ButtonSecondary label={"Cancel"} onClick={this.handleClick_Close} />
										<span style={{marginLeft:"5px"}} />
					                    <ButtonPrimary label={"Save"} onClick={this.handleClick_Save} />
									</div>
	                            </span>
	                        </div>
	                    </div>
	                </div>
	            </div>
			</div>
		)
	},

	getState: function (id, callback) {
		if (id) {
			ActionStore.getOne(id, function (doc) {
				callback({
					action: doc
				});
				this._action = doc;
			}.bind(this));
		} else {
			callback({
				action: this._action
			});
		}
	},

	handleChange_Action: function (action) {
		this._action = action;
        this.setState({
			action: this._action,
			pageIndex: this.state.pageIndex,
		});
	},

	handleChange_ActionStore: function () {
        this.getState(this.props.id, function (state) {
	        this.setState({
				action: this._action,
				pageIndex: this.state.pageIndex,
			});
        }.bind(this));
	},

	handleChange_Name: function (event) {
		this._action.name = event.target.value;
        this.setState({
			action: this._action,
			pageIndex: this.state.pageIndex,
		});
	},

	handleChange_Description: function (event) {
		this._action.description = event.target.value;
        this.setState({
			action: this._action,
			pageIndex: this.state.pageIndex,
		});
	},

	handleClick_ActionDetails: function () {
		this.setState({
			action: this.state.action,
			pageIndex: 0,
		});
	},

	handleClick_Parameters: function () {
		this.setState({
			action: this.state.action,
			pageIndex: 1,
		});
	},

	handleClick_Steps: function () {
		this.setState({
			action: this.state.action,
			pageIndex: 2,
		});
	},

	handleClick_Save: function () {
		if (this.props.id) {
			ActionActions.update(this.state.action);
		} else {
			ActionActions.create(this.state.action);
		}

        this.props.handleClose();
	},

    handleClick_Close: function () {
        this.props.handleClose();
    },
});

module.exports = Action;
