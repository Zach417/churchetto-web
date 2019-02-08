var React = require('react');

var UserStore = require('../../stores/UserStore.js');

var LinkItem = require('../Navigation/LinkItem.jsx');
var Spacer = require('../Navigation/Spacer.jsx');
var Header = require('../Navigation/Header.jsx');

function getState(callback) {
	UserStore.get(function (user) {
		callback({
			isAdmin: user[0].isAdmin
		});
	});
}

var Navigation = React.createClass({
	getInitialState: function () {
		return {
			isAdmin: ''
		}
	},

	componentWillMount: function () {
		getState(function (state) {
			this.setState(state);
		}.bind(this));
	},

    render: function(){
    	if (this.state.isAdmin === true) {
	        return (
	            <div className="feed-navigation">
	                <LinkItem label="◄ Back home" link="/" backgroundColor="#da383c" backgroundColorHover="#c22426" />
	                <Spacer />

	                <Header label="Settings" />
	                <LinkItem label="Profile" link="/settings" backgroundColor="#222222" backgroundColorHover="#0d0d0d" />

	                <Header label="Site Settings" />
	                <LinkItem label="Action Items" link="/settings/action" backgroundColor="#222222" backgroundColorHover="#0d0d0d" />
	                <LinkItem label="Task Category" link="/settings/task-category" backgroundColor="#222222" backgroundColorHover="#0d0d0d" />
	                <LinkItem label="Task Type" link="/settings/task-type" backgroundColor="#222222" backgroundColorHover="#0d0d0d" />
	            </div>
	        )
    	} else {
	        return (
	            <div className="feed-navigation">
	                <LinkItem label="Profile Settings" link="/settings" />
	            </div>
	        )
    	}
    }
});

module.exports = Navigation;
