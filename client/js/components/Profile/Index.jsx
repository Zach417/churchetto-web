var React = require('react');

var UserStore = require('../../stores/UserStore');
var UserActions = require('../../actions/UserActions');

var Style = require('./Style.jsx');
var Feed = require('../Feed/index.jsx');

function getState(callback) {
	UserStore.get(function (user) {
		callback({
			user: user[0]
		});
	});
}

var Profile = React.createClass({
	getInitialState: function () {
		return {
			user: {
				firstName: '',
			}
		};
	},

	componentWillMount: function () {
		getState(function (state) {
			this.setState(state);
		}.bind(this));
	},

    render: function () {
        return (
            <div style={Style.headerPadding} className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
                <div className="col-lg-3 col-md-3 hidden-sm hidden-xs">

                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
	                <div className="container-fluid" style={Style.heading}>
	                    <div className="row" style={Style.headingText}>
	                        <h1 className="text-uppercase">{this.getHeading()}</h1>
	                        <p>Glad to have you back.</p>
	                    </div>
	                </div>
	                <Feed />
                </div>
                <div className="col-lg-3 col-md-3 hidden-sm hidden-xs">

                </div>
            </div>
        )
    },

    getHeading: function () {
    	if (!this.state.user.firstName) {
    		return this.state.user.email;
    	} else {
    		return this.state.user.firstName;
    	}
    }
});

module.exports = Profile;