var React = require('react');
var Style = require('./Style.jsx');
var Attributes = require('./Attributes.jsx');
var ButtonDanger = require('../Button/Index.jsx').Danger;

var Step = React.createClass({
    componentWillMount: function () {
		this._step = this.props.step;
		if (!this._step.attributes) {
			this._step.attributes = [];
		}
    },

    componentWillReceiveProps: function () {
		this._step = this.props.step;
		if (!this._step.attributes) {
			this._step.attributes = [];
		}
    },

    render: function () {
        return (
            <div style={{padding:"10px 5px",margin:"10px 0",backgroundColor:"#ccc",borderLeft:"3px solid #666666"}} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="container-fluid" style={{margin:"0",padding:"0"}}>
                    <div className="row" style={{margin:"0",padding:"0"}}>
                        <div className="row-fluid">
                            <span className="col-lg-4 col-md-4 hidden-sm hidden-xs text-right">Name</span>
                            <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Name</span>
                        	<span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                        		<input style={Style.input} type="text" value={this.props.step.name} onChange={this.handleChange_Name} />
                        	</span>
                        </div>
                        <div className="row-fluid padding-top-15">
                            <span className="col-lg-4 col-md-4 hidden-sm hidden-xs text-right">Entity</span>
                            <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Entity</span>
                        	<span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                    	        <select style={Style.select} value={this.props.step.entity} onChange={this.handleChange_Entity}>
                    	            <option value=""></option>
                        	        <option value="task">Task</option>
                    	        </select>
                        	</span>
                        </div>
                        <div className="row-fluid padding-top-15">
                            <span className="col-lg-4 col-md-4 hidden-sm hidden-xs text-right">Type</span>
                            <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Type</span>
                        	<span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                    	        <select style={Style.select} value={this.props.step.type} onChange={this.handleChange_Type}>
                    	            <option value=""></option>
                        	        <option value="create">Create</option>
                        	        <option value="read">Read</option>
                        	        <option value="update">Update</option>
                        	        <option value="delete">Delete</option>
                    	        </select>
                        	</span>
                        </div>
                        <div className="row-fluid padding-top-15">
                            <span className="col-lg-4 col-md-4 hidden-sm hidden-xs text-right"></span>
                            <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left"></span>
                        	<span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                <Attributes
                                    step={this.props.step}
                                    handleChange={this.handleChange_Attributes} />
                        	</span>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="row-fluid">
                            <div style={{padding:"10px 0 0 0"}} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <span className="col-lg-4 col-md-4 hidden-sm hidden-xs"></span>
                                <span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                    <div style={{margin:"5px 0",float:"right",cursor:"pointer"}}>
                                        <ButtonDanger label={"Remove"} onClick={this.handleClick_Remove} />
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
			</div>
        )
    },

    handleChange_Attributes: function (attributes) {
		this._step.attributes = attributes;
		return this.props.handleChange(this._step);
    },

    handleChange_Name: function (event) {
        this._step = this.props.step;
        this._step.name = event.target.value;
        this.props.handleChange(this._step);
    },

    handleChange_Entity: function (event) {
        this._step = this.props.step;
        this._step.entity = event.target.value;
        this.props.handleChange(this._step);
    },

    handleChange_Type: function (event) {
        this._step = this.props.step;
        this._step.type = event.target.value;
        this.props.handleChange(this._step);
    },

    handleClick_Remove: function () {
        this.props.handleRemove(this.props.step);
    },
});

module.exports = Step;
