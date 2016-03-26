var React = require('react');

var Style = require('./Style.jsx');

var TaskNavigationStore = require('../../stores/TaskNavigationStore.js');

var Details = require('./Details.jsx');
var Meetings = require('./Meetings.jsx');
var People = require('./People.jsx');
var Documents = require('./Documents.jsx');
var Navigation = require('./Navigation.jsx');

function getTaskNavigationState () {
	return {
		currentPage: TaskNavigationStore.getCurrentPage()
	}
}

var Task = React.createClass({
    getInitialState: function() {
        return {
            currentPage: ''
        }
    },

    componentWillMount: function () {
        this.setState(getTaskNavigationState());
    },

    componentDidMount: function() {
        TaskNavigationStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TaskNavigationStore.removeChangeListener(this._onChange);
    },

	render: function () {
		return (
			<div style={Style.container} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		        <div className="col-lg-3 col-md-3 hidden-sm hidden-xs">
		        	<Navigation currentPage={this.state.currentPage} />
		        </div>
		        <div className="col-lg-9 col-md-9 hidden-sm hidden-xs">
                	{this.getCurrentComponent()}
		        </div>
		        <div style={Style.container} className="hidden-lg hidden-md">
                	{this.getCurrentComponent()}
		        </div>
			</div>
		)
	},

	getCurrentComponent: function () {
		if (this.state.currentPage === TaskNavigationStore.getPages()[0]) {
			return <Details id={this.props.id} handleClose={this.props.handleClose} />
		} else if (this.state.currentPage === TaskNavigationStore.getPages()[1]) {
			return <Meetings id={this.props.id} handleClose={this.props.handleClose} />
		} else if (this.state.currentPage === TaskNavigationStore.getPages()[2]) {
			return <People id={this.props.id} handleClose={this.props.handleClose} />
		} else if (this.state.currentPage === TaskNavigationStore.getPages()[3]) {
			return <Documents id={this.props.id} handleClose={this.props.handleClose} />
		}
	},

	_onChange: function () {
        this.setState(getTaskNavigationState());
	}
});

module.exports = Task;
