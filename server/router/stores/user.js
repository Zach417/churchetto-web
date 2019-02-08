var User = require('../../models/user');
var RestFilter = require('../../components/RestFilter');
var UserSecurity = require('../../components/UserSecurity');

var readFilterSchema = {
    "title": "User Schema",
    "type": "object",
    "properties": {
		"_id": {
			"type":"string",
		},
		"email": {
			"type":"string",
		},
		"firstName": {
			"type":"string",
		},
		"lastName": {
			"type":"string",
		},
		"isAdmin": {
			"type":"boolean",
		},
		"createdBy": {
			"type":"string",
		},
		"createdOn": {
			"type":"date",
		},
		"modifiedBy": {
			"type":"string",
		},
		"modifiedOn": {
			"type":"date",
		},
	},
}

var writeFilterSchema = {
    "title": "User Schema",
    "type": "object",
    "properties": {
		"firstName": {
			"type":"string",
		},
		"lastName": {
			"type":"string",
		},
	},
}

function findOne (user, id, callback) {
	User
		.findOne({"_id": id})
		.where({
			$or: [
				{"_id": user._id},
			]
		})
		.exec(function (err, result) {
			return callback(result);
		});
}

function findMany (user, callback) {
	User
		.find()
		.where({
			$or: [
				{"_id": user._id},
			]
		})
		.exec(function (err, result) {
			return callback(result);
		});
}

module.exports = new RestFilter({
	path : "/user",
	model: User,
	readFilterSchema: readFilterSchema,
	writeFilterSchema: writeFilterSchema,
	findOne: findOne,
	findMany: findMany,
	securityRoles: {
		create: UserSecurity.isNotAllowed,
		read: UserSecurity.isActiveUser,
		update: UserSecurity.isActiveUser,
		destroy: UserSecurity.isNotAllowed,
	}
});
