var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;

var NavigationActions = require('../../actions/NavigationActions');
var NavigationStore = require('../../stores/NavigationStore');

var Style = require('./Style.jsx');

function getSelectionStatus(path) {
    if (NavigationStore.getCurrentPage() == path) {
        return true;
    } else {
        return false;
    }
}

var Header = React.createClass({
	getInitialState: function () {
		return {
			style: ''
		}
	},

	componentWillMount: function () {
		if (getSelectionStatus(this.props.to)) {
			return this.setState({
				style: this.props.selectedStyle
			});
		} else {
			this.setState({
				style: this.props.defaultStyle
			});
		}
	},

    componentDidMount: function() {
        NavigationStore.addChangeListener(this.handleChangeNavigationStore);
    },

    componentWillUnmount: function() {
        NavigationStore.removeChangeListener(this.handleChangeNavigationStore);
    },

	render: function(){
		return (
			<div style={this.state.style} onClick={this.handleClick} onMouseOver={this.handleMouseOver}
				onMouseOut={this.handleMouseOut}>
				{this.getBody()}
			</div>
		)
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

	handleClick: function () {
		NavigationActions.changeCurrentPage(this.props.to);
	},

	handleMouseOver: function () {
		this.setState({
			style: this.props.selectedStyle
		});
	},

	handleMouseOut: function () {
		if (getSelectionStatus(this.props.to)) {
			return this.setState({
				style: this.props.selectedStyle
			});
		} else {
			this.setState({
				style: this.props.defaultStyle
			});
		}
	},

	handleChangeNavigationStore: function () {
		if (getSelectionStatus(this.props.to)) {
			return this.setState({
				style: this.props.selectedStyle
			});
		} else {
			this.setState({
				style: this.props.defaultStyle
			});
		}
	},
});
		
module.exports = Header;