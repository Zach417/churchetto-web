var React = require('react');

var Style = require('./Style.jsx');

var TaskNavigationActions = require('../../actions/TaskNavigationActions.js');
var TaskNavigationStore = require('../../stores/TaskNavigationStore.js');

var NavigationItem = require('../Navigation/Item.jsx');

var Navigation = React.createClass({
	render: function () {
		return (
            <div style={Style.navigation}>
            	{this.getNavigationItems()}
            </div>
		)
	},

	getNavigationItems: function () {
		var pages = TaskNavigationStore.getPages();
		return pages.map(function (page) {
			var selected = false;
			if (TaskNavigationStore.getCurrentPage().name == page.name) {
				selected = true;
			}
			// this is being a pain, and passing the selected variable through the isSelected props does
			// not acheive the desired results.
			return (
				<NavigationItem key={page.name} label={page.name} isSelected={false} handleClick={this.changePage.bind(this, page)} />
			);
		}.bind(this));
	},

	changePage: function (page) {
		TaskNavigationActions.change(page);
	},
});

module.exports = Navigation;