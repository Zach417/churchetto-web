var React = require('react');

var UserStore = require('../../stores/UserStore.js');

var Style = require('./Style.jsx');

var SelectOptionWrapper = require('./SelectOptionWrapper.jsx');

function createPlanOptions(users) {
    if (!users || users.length === 0){
        return;
    }
    return users.map(function (user) {
        return (
            <SelectOptionWrapper key={user._id} value={user._id} label={user.firstName + " " + user.lastName} />
        );
    });
}

function getState(callback) {
    UserStore.get(function (json) {
        callback({
            users: json
        });
    })
}

var PlanOptions = React.createClass({
    getInitialState: function() {
        return {
            users: []
        }
    },

    componentWillMount: function () {
        getState(function (state) {
            this.setState(state);
        }.bind(this));
    },

    componentDidMount: function() {
        UserStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        UserStore.removeChangeListener(this._onChange);
    },

	render: function () {
		return (
	        <select style={Style.select} value={this.props.value} onChange={this.props.handleChange}>
	            <option value="-1"></option>
                {createPlanOptions(this.state.users)}
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