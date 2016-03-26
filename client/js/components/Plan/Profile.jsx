var React = require('react');

var PlanActions = require('../../actions/PlanActions.js');
var PlanStore = require('../../stores/PlanStore.js');
var TaskStore = require('../../stores/TaskStore');

var Style = require('./Style.jsx');
var PlanFeed = require('./Feed.jsx');

function getPlanProfileState(id, callback) {
    PlanStore.getOne(id, function (json) {
        callback({
            plan: json
        });
    })
}

var PlanProfile = React.createClass({
    getInitialState: function() {
        return {
            plan: {
                _id: '',
                name: ''
            }
        }
    },

    componentWillMount: function () {
        getPlanProfileState(this.props.params.id, function (state) {
            this.setState(state);
        }.bind(this));
    },

    componentDidMount: function() {
        PlanStore.addChangeListener(this._onChange);
        TaskStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        PlanStore.removeChangeListener(this._onChange);
        TaskStore.removeChangeListener(this._onChange);
    },

    render: function(){
        return (
            <div>
                <div className="container-fluid" style={Style.heading}>
                    <div className="row">
                        <span className="text-uppercase">{this.state.plan.name}</span>
                    </div>
                </div>
            	<PlanFeed planId={this.props.params.id} />
            </div>
        );
    },

    _onChange: function() {
        getPlanProfileState(this.props.params.id, function (state) {
            this.setState(state);
        }.bind(this));
    }
});

module.exports = PlanProfile;
