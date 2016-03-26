var React = require('react');
var Style = require('./Style.jsx');
var ButtonDanger = require('../Button/Index.jsx').Danger;

var Parameter = React.createClass({
    componentWillMount: function () {
		this._parameter = this.props.parameter;
    },

    componentWillReceiveProps: function () {
		this._parameter = this.props.parameter;
    },

    render: function () {
        return (
            <div style={{padding:"10px 5px",margin:"10px 0",backgroundColor:"#ccc",borderLeft:"3px solid #666666"}} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="container-fluid" style={{margin:"0",padding:"0"}}>
                    <div className="row" style={{margin:"0",padding:"0"}}>
                        <div className="row-fluid">
                            <span className="col-lg-4 col-md-4 hidden-sm hidden-xs text-right">Label</span>
                            <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Label</span>
                            <span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                <input style={Style.input} type="text" value={this.props.parameter.label} onChange={this.handleChange_Label} />
                            </span>
                        </div>
                        <div className="row-fluid padding-top-15">
                            <span className="col-lg-4 col-md-4 hidden-sm hidden-xs text-right">Name</span>
                            <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Name</span>
                        	<span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                        		<input style={Style.input} type="text" value={this.props.parameter.name} onChange={this.handleChange_Name} />
                        	</span>
                        </div>
                        <div className="row-fluid padding-top-15">
                            <span className="col-lg-4 col-md-4 hidden-sm hidden-xs text-right">Type</span>
                            <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Type</span>
                        	<span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                        		<input style={Style.input} type="text" value={this.props.parameter.type} onChange={this.handleChange_Type} />
                        	</span>
                        </div>
                        <div className="row-fluid padding-top-15">
                            <span className="col-lg-4 col-md-4 hidden-sm hidden-xs text-right">Required</span>
                            <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Required</span>
                        	<span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                    	        <select style={Style.select} value={this.props.parameter.required} onChange={this.handleChange_Required}>
                    	            <option value=""></option>
                        	        <option value="true">True</option>
                        	        <option value="false">False</option>
                    	        </select>
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

    handleChange_Name: function (event) {
        this._parameter = this.props.parameter;
        this._parameter.name = event.target.value;
        this.props.handleChange(this._parameter);
    },

    handleChange_Type: function (event) {
        this._parameter = this.props.parameter;
        this._parameter.type = event.target.value;
        this.props.handleChange(this._parameter);
    },

    handleChange_Required: function (event) {
        this._parameter = this.props.parameter;

        if (event.target.value == "true") {
            this._parameter.required = true;
        } else if (event.target.value == "false") {
            this._parameter.required = false;
        } else {
            this._parameter.required = null;
        }

        this.props.handleChange(this._parameter);
    },

    handleChange_Label: function (event) {
        this._parameter = this.props.parameter;
        this._parameter.label = event.target.value;
        this.props.handleChange(this._parameter);
    },

    handleClick_Remove: function () {
        this.props.handleRemove(this.props.parameter);
    },
});

module.exports = Parameter;
