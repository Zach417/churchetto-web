var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;

var Style = require('./Style.jsx');

function getSelectionStatus(path) {
    if (window.location.pathname == path) {
        return true;
    } else {
        return false;
    }
}

var LinkItem = React.createClass({
    getInitialState: function () {
        return {
        	style: '',
        }
    },

	componentWillMount: function () {
        var style = $.extend(true, {}, Style.item);
        if (this.props.backgroundColor) {
            style.backgroundColor = this.props.backgroundColor;
        }

    	this.setState({
    		style: style
    	});
	},

    componentWillReceiveProps: function () {
        var style = $.extend(true, {}, Style.item);
        if (this.props.backgroundColor) {
            style.backgroundColor = this.props.backgroundColor;
        }

    	this.setState({
    		style: style
    	});
    },

    render: function(){
        var linkItemHoverStyle = $.extend(true, {}, Style.itemHover);
        if (this.props.backgroundColorHover) {
            linkItemHoverStyle.backgroundColor = this.props.backgroundColorHover;
        }

    	if (getSelectionStatus(this.props.link))
    	{
	        return (
	        	<Link to={this.props.link} style={Style.linkItem} onClick={this.handleClick}>
		            <div style={linkItemHoverStyle} className="btn btn-link">
                        {this.getImage()}
		            	{this.props.label}
		            </div>
	            </Link>
	        )
    	}
    	else
    	{
	        return (
	        	<Link to={this.props.link} style={Style.linkItem} onClick={this.handleClick} onMouseOver={this.mouseEnter} onMouseOut={this.mouseOut}>
		            <div style={this.state.style} className="btn btn-link">
                        {this.getImage()}
	            		{this.props.label}
	            	</div>
	            </Link>
	        )
    	}
    },

    handleClick: function () {
        if (this.props.handleClick) {
            this.props.handleClick();
        }
    },

    getImage: function () {
        if (this.props.img) {
            return (
                <span style={{marginRight:"5px"}}><img src={this.props.img} width="25px" /></span>
            )
        }
    },

    mouseEnter: function () {
        var style = $.extend(true, {}, Style.itemHover);
        if (this.props.backgroundColorHover) {
            style.backgroundColor = this.props.backgroundColorHover;
        }

    	this.setState({
    		style: style
    	});
    },

    mouseOut: function () {
        var style = $.extend(true, {}, Style.item);
        if (this.props.backgroundColor) {
            style.backgroundColor = this.props.backgroundColor;
        }

    	this.setState({
    		style: style
    	});
    },
});

module.exports = LinkItem;
