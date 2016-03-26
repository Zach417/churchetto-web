var React = require('react');

var TaskTypeStore = require('../../stores/TaskTypeStore.js');

var Style = require('./Style.jsx');

var SelectOptionWrapper = require('./SelectOptionWrapper.jsx');

function createOptions(docs) {
    if (!docs || docs.length === 0){
        return;
    }
    return docs.map(function (doc) {
        return (
            <SelectOptionWrapper key={doc._id} value={doc._id} label={doc.name} />
        );
    });
}

function getState(callback) {
    TaskTypeStore.get(function (json) {
        callback({
            taskTypes: json
        });
    })
}

var TaskTypeOptions = React.createClass({
    getInitialState: function() {
        return {
            taskTypes: []
        }
    },

    componentWillMount: function () {
        getState(function (state) {
            this.setState(state);
        }.bind(this));
    },

    componentDidMount: function() {
        TaskTypeStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TaskTypeStore.removeChangeListener(this._onChange);
    },

	render: function () {
		return (
	        <select style={Style.select} value={this.props.value} onChange={this.props.handleChange}>
	            <option value=""></option>
                {createOptions(this.state.taskTypes)}
	        </select>
		)
	},

    _onChange: function() {
        getState(function (state) {
            this.setState(state);
        }.bind(this));
    }
});

module.exports = TaskTypeOptions;