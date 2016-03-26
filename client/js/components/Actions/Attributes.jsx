var React = require('react');
var Style = require('./Style.jsx');
var Attribute = require('./Attribute.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;

var Attributes = React.createClass({
    componentWillMount: function () {
		this._step = this.props.step;
		if (!this._step.attributes) {
			this._step.attributes = [];
		}
    },

    render: function () {
        var attributes = (
            <div style={{padding:"10px 5px",margin:"10px 0",backgroundColor:"#f1f4f6",borderLeft:"3px solid #666666"}} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<div className="container-fluid">
					<div className="row">
						<div className="row-fluid">
							<span className="col-lg-4 col-md-4 hidden-sm hidden-xs"></span>
							<span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
								<div>{"No attributes have been added to this step"}</div>
							</span>
						</div>
					</div>
				</div>
			</div>
    	);

        if (this.props.step && this.props.step.attributes && this.props.step.attributes.length > 0) {
            attributes = this.props.step.attributes.map(function (doc) {
                return (
                    <Attribute key={doc._id} attribute={doc} handleChange={this.handleChange_Attribute} handleRemove={this.handleClick_Remove} />
                )
            }.bind(this));
        }

        return (
            <div className="container-fluid" style={{margin:"10px 0 0 0",padding:"0"}}>
                <div className="row">
                    <div className="row-fluid">
                        <span style={{margin:"5px 0",fontSize:"22px"}} className="col-lg-8 col-md-8 col-sm-6 col-xs-6"><b>{"Attributes"}</b></span>
                        <span style={{margin:"5px 0"}} className="col-lg-4 col-md-4 col-sm-6 col-xs-6">
                            <span style={{float:"right",cursor:"pointer"}}>
								<ButtonPrimary label={"Add"} onClick={this.handleClick_Add} />
							</span>
                        </span>
                    </div>
                    <div className="row-fluid">
                        {attributes}
                    </div>
                </div>
            </div>
        )
    },

	handleChange_Attribute: function (attribute) {
		for (var i = 0; i < this._step.attributes.length; i++) {
			if (this._step.attributes[i]._id === attribute._id) {
				this._step.attributes[i] = attribute;
		        return this.props.handleChange(this._step.attributes);
            }
		}
	},

	handleClick_Remove: function (attribute) {
		for (var i = 0; i < this._step.attributes.length; i++) {
			if (this._step.attributes[i]._id === attribute._id) {
                this._step.attributes.splice(i, 1);
		        return this.props.handleChange(this._step.attributes);
            }
		}
	},

    handleClick_Add: function () {
		var id = Math.floor(Math.random() * (1000000000 - 0)) + 0;
		this._step.attributes.push({_id:id});
		return this.props.handleChange(this._step.attributes);
    },
});

module.exports = Attributes;
