var React = require('react');

var TaskCategoryStore = require('../../stores/TaskCategoryStore.js');

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
    TaskCategoryStore.get(function (json) {
        callback({
            taskCategories: json
        });
    })
}

var PlanOptions = React.createClass({
    getInitialState: function() {
        return {
            taskCategories: []
        }
    },

    componentWillMount: function () {
        getState(function (state) {
            this.setState(state);
        }.bind(this));
    },

    componentDidMount: function() {
        TaskCategoryStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TaskCategoryStore.removeChangeListener(this._onChange);
    },

	render: function () {
		return (
	        <select style={Style.select} value={this.props.value} onChange={this.props.handleChange}>
	            <option value=""></option>
                {createOptions(this.state.taskCategories)}
	        </select>
		)
	},

    _onChange: function() {
        getState(function (state) {
            this.setState(state);
        }.bind(this));
    }
});

module.exports = PlanOptions;