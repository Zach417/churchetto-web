var StoreTemplate = require('./Template');
var ChurchettoDataService = require('../services/ChurchettoData');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/ChurchConstants.js');

var Store = new StoreTemplate(ChurchettoDataService.churches);

Store.getMemberFromChurch = function (church, id) {
	if (!church.members || church.members.length === 0) {
		return {};
	}

	for (var i = 0; i < church.members.length; i++) {
		if (church.members[i]._id == id) {
			return church.members[i];
		}
	}

	return {};
}

Store.updateMemberInChurch = function (church, member) {
	if (!church.members || church.members.length === 0) {
		church.members = [];
		church.members.push(member);
		return church;
	}

	for (var i = 0; i < church.members.length; i++) {
		if (church.members[i]._id == member._id) {
			church.members[i] = member;
			return church;
		}
	}
}

AppDispatcher.register(function(action) {
	switch(action.actionType) {

		case Constants.CHURCH_CREATE:
			Store.insert(action.doc, function(data) {
				Store.emitChange();
			});
			break;

		case Constants.CHURCH_UPDATE:
			Store.update(action.doc, function(data) {
				Store.emitChange();
			});
			break;

		case Constants.CHURCH_DESTROY:
			Store.delete(action.doc, function(data) {
				Store.emitChange();
			});
			break;
	}
});

module.exports = Store;
