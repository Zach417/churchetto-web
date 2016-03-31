var StoreTemplate = require('./Template');
var ChurchettoDataService = require('../services/ChurchettoData');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/MemberConstants.js');

var Store = new StoreTemplate(ChurchettoDataService.members);

Store.getAssociatedFromChurch = function (church, callback) {
	if (!church.members || church.members.length === 0) {
		return [];
	}

	Store.get(function (docs) {
		var result = [];
		for (var i = 0; i < church.members.length; i++) {
			Store.getOne(church.members[j], function (doc) {
				result.push(doc);
				if (i === church.members.length - 1) {
					return callback(result);
				}
			});
		}
	});
}

AppDispatcher.register(function(action) {
	switch(action.actionType) {

		case Constants.MEMBER_CREATE:
			Store.insert(action.doc, function(data) {
				Store.emitChange();
			});
			break;

		case Constants.MEMBER_UPDATE:
			Store.update(action.doc, function(data) {
				Store.emitChange();
			});
			break;

		case Constants.MEMBER_DESTROY:
			Store.delete(action.doc, function(data) {
				Store.emitChange();
			});
			break;
	}
});

module.exports = Store;
