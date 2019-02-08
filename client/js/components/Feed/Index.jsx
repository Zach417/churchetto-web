var React = require('react');

var TaskStore = require('../../stores/TaskStore');

var FeedItemConstants = require('../../constants/FeedItemConstants.js');

var Item = require('./Item.jsx');

function getTasks (callback) {
    TaskStore.get(function (json) {
        callback(json);
    });
}

var Feed = React.createClass({
    getInitialState: function () {
        return {
            tasks: []
        }
    },

    componentWillMount: function () {
        getTasks(function (json) {
            this.setState({
                tasks: json
            });
        }.bind(this));
    },

    componentDidMount: function() {
        TaskStore.addChangeListener(this.handleTaskStoreChange);
    },

    componentWillUnmount: function() {
        TaskStore.removeChangeListener(this.handleTaskStoreChange);
    },

    render: function(){
        return (
            <div>
                {this.loadTasks()}
            </div>
        )
    },

    loadTasks: function () {
        if (!this.state.tasks || this.state.tasks.length === 0){
            return (
                <div></div>
            )
        }
        return this.state.tasks.map(function (task) {
            return (
                <Item
                    key={task._id}
                    object={task}
                    type={FeedItemConstants.TASK}
                    linkPath={"?action=open-task&id=" + task._id} />
            );
        });
    },

    handleTaskStoreChange: function () {
        getTasks(function (json) {
            this.setState({
                tasks: json
            });
        }.bind(this));
    }
});

module.exports = Feed;
