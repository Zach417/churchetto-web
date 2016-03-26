var React = require('react');

var UserStore = require('../../stores/UserStore');
var UserActions = require('../../actions/UserActions');

var Style = require('./Style.jsx');

function getState(callback) {
    UserStore.get(function (user) {
        callback({
            user: user[0]
        });
    });
}

var _user = {
    firstName: '',
    lastName: '',
};

var Settings = React.createClass({
    getInitialState: function() {
        return {
            user: _user
        }
    },

    componentWillMount: function () {
        getState(function (state) {
            _user = state.user;
            this.setState({user: _user});
        }.bind(this));
    },

    componentDidMount: function() {
        UserStore.addChangeListener(this.handleStoreChangeUserStore);
    },

    componentWillUnmount: function() {
        UserStore.removeChangeListener(this.handleStoreChangeUserStore);
    },

    render: function(){
        return (
            <div>
                <div className="container-fluid" style={Style.heading}>
                    <div className="row">
                        <span className="text-uppercase">Profile Settings</span>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="row-fluid padding-top-15">
                            <span className="col-lg-3 col-md-3 hidden-sm hidden-xs text-right">First Name</span>
                            <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">First Name</span>
                            <span className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                                <input style={Style.input} type="text" value={this.state.user.firstName} onChange={this.handleChangeFirstName} />
                            </span>
                            <span className="col-lg-2 col-md-2 hidden-sm hidden-xs" />
                        </div>
                        <div className="row-fluid padding-top-15">
                            <span className="col-lg-3 col-md-3 hidden-sm hidden-xs text-right">Last Name</span>
                            <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Last Name</span>
                            <span className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                                <input style={Style.input} type="text" value={this.state.user.lastName} onChange={this.handleChangeLastName} />
                            </span>
                            <span className="col-lg-2 col-md-2 hidden-sm hidden-xs" />
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row-fluid padding-top-05">
                        <span className="col-lg-3 col-md-3 col-sm-12 col-xs-12"></span>
                        <span className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                            <div className="btn btn-primary" style={Style.saveButton} onClick={this.handleClickSave}>Save</div>
                            <div className="btn btn-default" onClick={this.handleClickCancel}>Cancel</div>
                        </span>
                        <span className="col-lg-2 col-md-2 hidden-sm hidden-xs" />
                    </div>
                </div>
            </div>
        )
    },

    handleStoreChangeUserStore: function () {
        getState(function (state) {
            _user = state.user;
            this.setState({user: _user});
        }.bind(this));
    },

    handleClickSave: function() {
        UserActions.saveUser(this.state.user);
    },

    handleClickCancel: function() {

    },

	handleChangeFirstName: function(event) {
        _user.firstName = event.target.value;
        this.setState({user: _user});
	},

    handleChangeLastName: function(event) {
        _user.lastName = event.target.value;
        this.setState({user: _user});
    },
});

module.exports = Settings;
