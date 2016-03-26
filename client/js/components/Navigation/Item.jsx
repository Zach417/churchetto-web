var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;

var Style = require('./Style.jsx');

var Item = React.createClass({
    getInitialState: function () {
        return {
            isSelected: '',
        }
    },

	componentWillMount: function () {
        this.setState({
            isSelected: this.props.isSelected
        });
	},

    componentWillReceiveProps: function () {
        this.setState({
            isSelected: this.props.isSelected
        });
    },

    render: function(){
        var style = Style.item;
        if (this.state.isSelected) {
            style = Style.itemHover;
        }

        return (
            <div className="btn btn-link" style={style} onMouseOver={this.mouseEnter} onMouseOut={this.mouseOut} onClick={this.handleClick}>
        		{this.props.label}
        	</div>
        )
    },

    mouseEnter: function () {
        this.setState({
            isSelected: true
        });
    },

    mouseOut: function () {
        this.setState({
            isSelected: this.props.isSelected
        });
    },

    handleClick: function () {
        this.setState({
            isSelected: true
        });
        this.props.handleClick();
    }
});

module.exports = Item;
