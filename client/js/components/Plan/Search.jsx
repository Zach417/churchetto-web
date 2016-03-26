var React = require('react');
var S = require('string');

var PlanStore = require('../../stores/PlanStore.js');
var LinkItem = require('../Navigation/LinkItem.jsx');
var Spacer = require('../Navigation/Spacer.jsx');
var Header = require('../Navigation/Header.jsx');

function createNavigationItemComponents(plans) {
    if (!plans || plans.length === 0){
        return;
    }
    return plans.map(function (plan) {
        return (
            <LinkItem key={plan._id} label={"📁 " + plan.name} link={"/plan/" + plan._id} backgroundColor="#0e2e47" backgroundColorHover="#081c2b" />
        );
    });
}

function getPlanProfileState(callback) {
    PlanStore.get(function (json) {
        callback({
            plans: json
        });
    })
}

var PlanSearch = React.createClass({
    getInitialState: function() {
        return {
            plans: []
        }
    },

    componentWillMount: function () {
        getPlanProfileState(function (state) {
            this.setState(state);
        }.bind(this));
    },

    componentDidMount: function() {
        PlanStore.addChangeListener(this.handleChangePlanStore);
    },

    componentWillUnmount: function() {
        PlanStore.removeChangeListener(this.handleChangePlanStore);
    },

    render: function () {
        if (this.props.options && this.props.options.isComponent === true) {
            return (
                <div>
                    <Header label="📂 Plans" />
                    <div style={{marginBottom:"5px"}}>
                        <input type="text" placeholder="🔎 Search for a plan" style={{padding:"5px",width:"100%"}} onChange={this.handleChangePlanSearch} />
                    </div>
                    {createNavigationItemComponents(this.state.plans)}
                </div>
            )
        }

        return (
            <div style={{paddingTop:"60px"}} className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
                <Header label="📂 Plans" />
                <div style={{marginBottom:"5px"}}>
                    <input type="text" placeholder="🔎 Search for a plan" style={{padding:"5px",width:"100%"}} onChange={this.handleChangePlanSearch} />
                </div>
                {createNavigationItemComponents(this.state.plans)}
            </div>
        )
    },

    handleChangePlanSearch: function (event) {
        getPlanProfileState(function (state) {

            if (S(event.target.value).isEmpty()) {
                return this.setState(state);
            }

            var _plans = [];

            for (var i = 0; i < state.plans.length; i++) {
                if (S(state.plans[i].name.toUpperCase()).contains(event.target.value.toUpperCase())) {
                    _plans.push(state.plans[i]);
                }
            }

            this.setState({
                plans: _plans
            });

        }.bind(this));
    },

    handleChangePlanStore: function() {
        getPlanProfileState(function (state) {
            this.setState(state);
        }.bind(this));
    },
});

module.exports = PlanSearch;
