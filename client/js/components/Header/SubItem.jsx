var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;

var Style = require('./Style.jsx');

var Header = React.createClass({
	getInitialState: function () {
		return {
			style: ''
		}
	},

	componentWillMount: function () {
		this.setState({
			style: Style.linkSubItem
		});
	},

	componentDidReceiveProps: function () {
		this.setState({
			style: Style.linkSubItem
		});
	},

	render: function(){
		var style = this.state.style;

		if (this.props.fullWidth === true) {
			style.width = "100%";
		} else {
			style.width = "";
		}

		if (this.props.to) {
			return (
				<Link
					to={this.props.to}
					style={style}
					onClick={this.props.handleClick}
					onMouseOver={this.handleMouseOver}
					onMouseOut={this.handleMouseOut}>

					{this.getBody()}

				</Link>
			);
		} else if (this.props.href) {
			return (
				<a
					href={this.props.href}
					style={style}
					onClick={this.props.handleClick}
					onMouseOver={this.handleMouseOver}
					onMouseOut={this.handleMouseOut}>

					{this.getBody()}

				</a>
			);
		} else {
			return (
				<div
					href={this.props.href}
					style={style}
					onClick={this.props.handleClick}
					onMouseOver={this.handleMouseOver}
					onMouseOut={this.handleMouseOut}>

					{this.getBody()}

				</div>
			);
		}
	},

	getBody: function () {
		if (this.props.label && !this.props.imgSrc) {
			return this.props.label;
		} else if (this.props.imgSrc && !this.props.label) {
			return (
				<img src={this.props.imgSrc} style={{maxHeight:"20px"}} />
			)
		} else if (this.props.imgSrc && this.props.label) {
			return (
				<div>
					<img src={this.props.imgSrc} style={{width:"22px", paddingRight: "8px"}} />
					<span>{this.props.label}</span>
				</div>
			)
		}
	},

	handleMouseOver: function () {
		this.setState({
			style: Style.linkSubItemHover
		});
	},

	handleMouseOut: function () {
		this.setState({
			style: Style.linkSubItem
		});
	},
});
		
module.exports = Header;