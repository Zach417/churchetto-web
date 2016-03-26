var React = require('react');
var Chart = require('react-google-charts').Chart;
var TaskStore = require('../../stores/TaskStore.js');
var PlanStore = require('../../stores/PlanStore.js');
var Style = require('./Style.jsx');

var _state = {};

var Dashboard = React.createClass({
    getInitialState: function () {
        _state.taskCount = '-';
        _state.planCount = '-';
        return _state;
    },

    componentWillMount: function () {
        TaskStore.get(function (tasks) {
            _state.taskCount = tasks.length;
            this.setState(_state);
        }.bind(this));

        PlanStore.get(function (plans) {
            _state.planCount = plans.length;
            this.setState(_state);
        }.bind(this));
    },

    componentDidMount: function() {
        TaskStore.addChangeListener(this.handleStoreChangeTask);
        PlanStore.addChangeListener(this.handleStoreChangePlan);
    },

    componentWillUnmount: function() {
        TaskStore.removeChangeListener(this.handleStoreChangeTask);
        PlanStore.removeChangeListener(this.handleStoreChangePlan);
    },

    render: function () {
        return (
            <div>
                <h1>Dashboard</h1>
                <div className="row-fluid" style={Style.container}>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6" style={Style.componentContainer}>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{backgroundColor:"#da383c",padding: "50px 10px"}}>
                            <div className="hidden-lg hidden-md hidden-sm">
                                <div className="col-xs-12" style={{padding:"0",margin:"0"}}>
                                    <div style={{textAlign:"center",fontSize:"48px"}}>{this.state.taskCount}</div>
                                </div>
                                <div className="col-xs-12" style={{padding:"0",margin:"0"}}>
                                    <div style={{textAlign:"center",fontSize:"14px",padding:"5px"}}>Open Tasks</div>
                                </div>
                            </div>
                            <div className="hidden-xs">
                                <div className="col-lg-6 col-md-6 col-sm-6" style={{padding:"0",margin:"0"}}>
                                    <div style={{float:"right",fontSize:"48px"}}>{this.state.taskCount}</div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6" style={{padding:"0",margin:"0"}}>
                                    <div style={{float:"left",fontSize:"14px",padding:"14px 5px"}}>Open<br />Tasks</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{padding: "10px"}}>
                            <div style={{display:"none"}}>I should add charts here.</div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6" style={Style.componentContainer}>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{backgroundColor:"#0e2e47",padding: "50px 10px"}}>
                            <div className="hidden-lg hidden-md hidden-sm">
                                <div className="col-xs-12" style={{padding:"0",margin:"0"}}>
                                    <div style={{textAlign:"center",fontSize:"48px"}}>{this.state.planCount}</div>
                                </div>
                                <div className="col-xs-12" style={{padding:"0",margin:"0"}}>
                                    <div style={{textAlign:"center",fontSize:"14px",padding:"5px"}}>Active Plans</div>
                                </div>
                            </div>
                            <div className="hidden-xs">
                                <div className="col-lg-6 col-md-6 col-sm-6" style={{padding:"0",margin:"0"}}>
                                    <div style={{float:"right",fontSize:"48px"}}>{this.state.planCount}</div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6" style={{padding:"0",margin:"0"}}>
                                    <div style={{float:"left",fontSize:"14px",padding:"14px 5px"}}>Active<br />Plans</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{padding: "10px"}}>
                            <div style={{display:"none"}}>I should add charts here.</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    },

    handleStoreChangeTask: function () {
        TaskStore.get(function (tasks) {
            this.setState({
                taskCount: tasks.length,
                planCount: this.state.planCount,
            })
        }.bind(this));
    },

    handleStoreChangePlan: function () {
        PlanStore.get(function (plans) {
            this.setState({
                taskCount: this.state.taskCount,
                planCount: plans.length,
            })
        }.bind(this));
    },
});

module.exports = Dashboard;
