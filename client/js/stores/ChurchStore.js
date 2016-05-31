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

function removeMoneyFormat (church) {
	if (church.contributions) {
		church.contributions.map(function (contribution, i) {
			if (contribution.amount) {
				church.contributions[i].amount = parseFloat (
					contribution.amount
						.toString()
						.replace(new RegExp('\\$', 'g'), '')
						.replace(new RegExp(',', 'g'), '')
				);
			}
		});
	}
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
	if (church.contributions) {
		for (var i = 0; i < church.contributions.length; i++) {
			if (church.contributions[i].date) {
				church.contributions[i].date = moment(church.contributions[i].date).utc();
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
			if (church.members[i].dateOfDeath) {
				church.members[i].dateOfDeath = moment(church.members[i].dateOfDeath).utc();
			}
			if (church.members[i].baptizedOn) {
				church.members[i].baptizedOn = moment(church.members[i].baptizedOn).utc();
			}
			if (church.members[i].dateOfMembership) {
				church.members[i].dateOfMembership = moment(church.members[i].dateOfMembership).utc();
			}
			if (church.members[i].dateOfAnniversary) {
				church.members[i].dateOfAnniversary = moment(church.members[i].dateOfAnniversary).utc();
			}
			if (church.members[i].dateOfFaithConfirmation) {
				church.members[i].dateOfFaithConfirmation = moment(church.members[i].dateOfFaithConfirmation).utc();
			}
			if (church.members[i].dateOfFaithReaffirmation) {
				church.members[i].dateOfFaithReaffirmation = moment(church.members[i].dateOfFaithReaffirmation).utc();
			}
		}
	}
}

AppDispatcher.register(function(action) {
	switch(action.actionType) {

		case Constants.CHURCH_CREATE:
			setDatesToUtc(action.doc);
			removeMoneyFormat(action.doc);
			Store.insert(action.doc, function(data) {
				Store.emitChange();
			});
			break;

		case Constants.CHURCH_UPDATE:
			setDatesToUtc(action.doc);
			removeMoneyFormat(action.doc);
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
