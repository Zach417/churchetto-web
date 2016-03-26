var React = require('react');
var $ = require('jquery');

var PlanActions = require('../../actions/PlanActions.js');
var PlanStore = require('../../stores/PlanStore.js');

var Style = require('./Style.jsx');

var PlanNavigation = require('./Navigation.jsx');
var PlanProfile = require('./Profile.jsx');

function getPlanProfileState(id, callback) {
    PlanStore.getOne(id, function (json) {
        callback({
            plan: json
        });
    })
}

var PlanPage = React.createClass({
    getInitialState: function() {
        return {
            plan: {
                _id: '',
                name: '',
                planType: ''
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
    },

    componentWillUnmount: function() {
        PlanStore.removeChangeListener(this._onChange);
    },

    render: function(){
        return (
            <div style={Style.headerPadding} className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
                <div className="col-lg-3 col-md-3 hidden-sm hidden-xs" style={{paddingLeft:"0",marginLeft:"0"}}>
                    <PlanNavigation planId={this.state.plan._id} />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{padding:"0",margin:"0"}}>
					{this.props.children}
                </div>
                <div className="col-lg-3 col-md-3 hidden-sm hidden-xs" style={{paddingRight:"0",marginRight:"0"}}>

                </div>
            </div>
        );
    },

    _onChange: function() {
        getPlanProfileState(this.props.params.id, function (state) {
            console.log(state);
            this.setState(state);
        }.bind(this));
    }
});

module.exports = PlanPage;
