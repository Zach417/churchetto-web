var React = require('react');

var TaskStore = require('../../stores/TaskStore');

var FeedItemConstants = require('../../constants/FeedItemConstants.js');

var Task = require('../Task/Index.jsx');
var ModalWindow = require('../ModalWindow/Index.jsx');
var Item = require('../Feed/Item.jsx');

function getTasks (planId, callback) {
    TaskStore.getPlanTasks(planId, function (json) {
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
        getTasks(this.props.planId, function (json) {
            this.setState({
                tasks: json
            });
        }.bind(this));
    },

    componentWillReceiveProps: function () {
        getTasks(this.props.planId, function (json) {
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
                {this.loadTasks(this.props.planId)}
            </div>
        )
    },

    loadTasks: function (planId) {
        if (!this.state.tasks || this.state.tasks.length === 0){
            return;
        }
        return this.state.tasks.map(function (task) {
            return (
                <Item
                    key={task._id}
                    object={task}
                    type={FeedItemConstants.TASK}
                    linkPath={"/plan/" + planId + "?action=open-task&id=" + task._id} />
            );
        });
    },

    handleTaskStoreChange: function () {
        getTasks(this.props.planId, function (json) {
            this.setState({
                tasks: json
            });
        }.bind(this));
    }
});

module.exports = Feed;