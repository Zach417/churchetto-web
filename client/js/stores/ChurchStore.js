var moment = require('moment');
var StoreTemplate = require('./Template');
var ChurchettoDataService = require('../services/ChurchettoData');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/ChurchConstants.js');

var Store = new StoreTemplate(ChurchettoDataService.churches);

Store.getSubDocFromChurch = function (church, subDoc, id) {
	if (!church[subDoc] || church[subDoc].length === 0) {
		return {};
	}

	for (var i = 0; i < church[subDoc].length; i++) {
		if (church[subDoc][i]._id == id) {
			return church[subDoc][i];
		}
	}

	return {};
}

function setDatesToUtc (church) {
	if (church.events) {
		for (var i = 0; i < church.events.length; i++) {
			if (church.events[i].starts) {
				church.events[i].starts = moment(church.events[i].starts).utc();
			}
			if (church.events[i].ends) {
				church.events[i].ends = moment(church.events[i].ends).utc();
			}
	    if (church.events[i].attendees) {
	      for (var j = 0; j < church.events[i].attendees.length; j++) {
	        if (church.events[i].attendees[j].checkedInDate) {
	          church.events[i].attendees[j].checkedInDate = moment(church.events[i].attendees[j].checkedInDate).utc();
	        }
	      }
	    }
		}
	}
	if (church.attendance) {
		for (var i = 0; i < church.attendance.length; i++) {
			if (church.attendance[i].date) {
				church.attendance[i].date = moment(church.attendance[i].date).utc();
			}
		}
	}
	if (church.members) {
		for (var i = 0; i < church.members.length; i++) {
			if (church.members[i].dateOfBirth) {
				church.members[i].dateOfBirth = moment(church.members[i].dateOfBirth).utc();
			}
			if (church.members[i].baptizedOn) {
				church.members[i].baptizedOn = moment(church.members[i].baptizedOn).utc();
			}
		}
	}
}

AppDispatcher.register(function(action) {
	switch(action.actionType) {

		case Constants.CHURCH_CREATE:
			setDatesToUtc(action.doc);
			Store.insert(action.doc, function(data) {
				Store.emitChange();
			});
			break;

		case Constants.CHURCH_UPDATE:
			setDatesToUtc(action.doc);
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
