var StoreTemplate = require('./Template');
var ChurchettoDataService = require('../services/ChurchettoData');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/CampusConstants.js');

var Store = new StoreTemplate(ChurchettoDataService.campuses);

Store.getAssociatedFromChurch = function (church, callback) {
	if (!church.campuses || church.campuses.length === 0) {
		return [];
	}

	Store.get(function (docs) {
		var result = [];
		for (var i = 0; i < church.campuses.length; i++) {
			Store.getOne(church.campuses[j], function (doc) {
				result.push(doc);
				if (i === church.campuses.length - 1) {
					return callback(result);
				}
			});
		}
	});
}

AppDispatcher.register(function(action) {
	switch(action.actionType) {

		case Constants.CAMPUS_CREATE:
			Store.insert(action.doc, function(data) {
				Store.emitChange();
			});
			break;

		case Constants.CAMPUS_UPDATE:
			Store.update(action.doc, function(data) {
				Store.emitChange();
			});
			break;

		case Constants.CAMPUS_DESTROY:
			Store.delete(action.doc, function(data) {
				Store.emitChange();
			});
			break;
	}
});

module.exports = Store;
