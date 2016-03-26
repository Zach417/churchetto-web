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
			style: Style.linkItem
		});
	},

	componentDidReceiveProps: function () {
		this.setState({
			style: Style.linkItem
		});
	},

	render: function(){
		if (this.props.to) {
			return (
				<Link
					to={this.props.to}
					style={this.state.style}
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
					style={this.state.style}
					onClick={this.props.handleClick}
					onMouseOver={this.handleMouseOver}
					onMouseOut={this.handleMouseOut}>

					{this.getBody()}

				</a>
			);
		} else {
			return (
				<div
					id={this.props.id}
					href={this.props.href}
					style={this.state.style}
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
				<span>
					<img src={this.props.imgSrc} style={{width:"22px", paddingRight: "8px"}} />
					<span style={{fontSize:"13px"}}>{this.props.label}</span>
				</span>
			)
		}
	},

	handleMouseOver: function () {
		this.setState({
			style: Style.linkItemHover
		});
	},

	handleMouseOut: function () {
		this.setState({
			style: Style.linkItem
		});
	},
});
		
module.exports = Header;