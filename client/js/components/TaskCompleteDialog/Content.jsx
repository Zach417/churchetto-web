var React = require('react');
var $ = require('jquery');
var browserHistory = require('react-router').browserHistory;

var Style = require('./Style.jsx');
var ModalWindow = require('../ModalWindow/Index.jsx');

var TaskStore = require('../../stores/TaskStore');
var TaskActions = require('../../actions/TaskActions');

function getComponentId (task) {
    return "task-complete-dialog-" + task._id;
}

function getNavigationId(task) {
    return "task-complete-dialog-navigation-" + task._id;
}

var TaskCompleteDialog = React.createClass({
    getInitialState: function () {
        return {
            pageNumber: ''
        }
    },

    componentWillMount: function () {
        this.setState({
            pageNumber: 0
        });
    },

    componentDidMount: function () {
        $("#" + getComponentId(this.props.task)).fadeIn("fast");
        $("#" + getNavigationId(this.props.task)).delay(200).slideDown("slow");
    },

    componentWillUnmount: function() {

    },

    render: function() {
        var pages = [(
            <div>
                <p>
                    {"Congratulations on completing a task! "}
                    {"By keeping up with your tasks, you are making strides towards ensuring that you are fiduciarily prudent."}
                </p>
                <p>
                    {"Before we put this task to rest, we need to double check some things and make sure everything has been recorded; "}
                    {"this is an important step that ensures you receive credit for all of the hard work that has been done!"}
                </p>
            </div>
        ), (
            <div>
                Meetings
            </div>
        ), (
            <div>
                Documents
            </div>
        ), (
            <div>
                People
            </div>
        )];

        return (
            <div id={getComponentId(this.props.task)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={Style.container}>
                <div style={Style.head}>
                    {this.getHeader()}
                </div>
                <div style={Style.body}>
                    {this.getStepHeader()}
                    <div style={{padding:"10px 0 5px 0"}}>
                        {pages[this.state.pageNumber]}
                    </div>
                    {this.getNavigation()}
                </div>
            </div>
        )
    },

    getHeader: function () {
        if (this.state.pageNumber <= 0) {
            return (
                <div style={Style.headingText}>Congratulations!</div>
            )
        } else {
            return (
                <div style={Style.headingText}>Task Completion Dialog</div>
            )
        }
    },

    getNavigation: function () {
        if (this.state.pageNumber <= 0) {
            return (
                <div id={getNavigationId(this.props.task)} style={Style.navigation}>
                    <div className="btn btn-default" onClick={this.handleClickNext}>Next</div>
                </div>
            )
        } else if (this.state.pageNumber >= 3) {
            return (
                <div id={getNavigationId(this.props.task)} style={Style.navigation}>
                    <div className="btn btn-default" onClick={this.handleClickPrevious}>Previous</div>
                    <div className="btn btn-primary" onClick={this.handleClickFinish}>Finish</div>
                </div>
            )
        } else {
            return (
                <div id={getNavigationId(this.props.task)} style={Style.navigation}>
                    <div className="btn btn-default" onClick={this.handleClickPrevious}>Previous</div>
                    <div className="btn btn-default" onClick={this.handleClickNext}>Next</div>
                </div>
            )
        }
    },

    getStepHeader: function () {
        var step1Style = Style.unselectedStep;
        var step2Style = Style.unselectedStep;
        var step3Style = Style.unselectedStep;

        switch (this.state.pageNumber) {
            case 1:
                step1Style = Style.selectedStep;
                break;
            case 2:
                step2Style = Style.selectedStep;
                break;
            case 3:
                step3Style = Style.selectedStep;
                break;
        }

        return (
            <div className="row">
                <div style={step1Style} className="col-lg-4 col-md-4 col-sm-6 col-xs-12" onClick={this.handleClickStep1}>
                    <div><b>Step 1:</b></div>
                    <div>Meetings</div>
                </div>
                <div style={step2Style} className="col-lg-4 col-md-4 col-sm-6 col-xs-12" onClick={this.handleClickStep2}>
                    <div><b>Step 2:</b></div>
                    <div>Documents</div>
                </div>
                <div style={step3Style} className="col-lg-4 col-md-4 col-sm-6 col-xs-12" onClick={this.handleClickStep3}>
                    <div><b>Step 3:</b></div>
                    <div>People</div>
                </div>
            </div>
        )
    },

    handleClickStep1: function () {
        this.setState({
            pageNumber: 1
        });
    },

    handleClickStep2: function () {
        this.setState({
            pageNumber: 2
        });
    },

    handleClickStep3: function () {
        this.setState({
            pageNumber: 3
        });
    },

    handleClickNext: function () {
        var page = this.state.pageNumber + 1;
        if (page > 3) {
            page = 3;
        }
        this.setState({
            pageNumber: page
        });
    },

    handleClickPrevious: function () {
        var page = this.state.pageNumber - 1;
        if (page < 0) {
            page = 0;
        }
        this.setState({
            pageNumber: page
        });
    },

    handleClickFinish: function () {
        this.props.handleClose();
    },
});

module.exports = TaskCompleteDialog;
