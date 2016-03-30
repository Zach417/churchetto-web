var Model = require('../../models/member');
var RestFilter = require('../../components/RestFilter');
var UserSecurity = require('../../components/UserSecurity');
var Church = require('../../models/church');

function getMembersFromChurches(churches, callback) {
  Church
    .find()
    .where({
      $or: [{
        "_id": {
          $in : churches
        }
      }]
    })
    .exec(function(err, result) {
      var members = [];
      for (var i = 0; i < result.length; i++) {
        for (var j = 0; j < result[i].members.length; j++) {
          members.push(result[i].members[j]);
        }
      }
      return callback(members);
    });
}

var readFilterSchema = {
  "title": "User Schema",
  "type": "object",
  "properties": {
    "_id": {
      "type": "string",
    },
    "firstName": {
      "type": "string",
    },
    "lastName": {
      "type": "string",
    },
    "dateOfBirth": {
      "type": "date",
    },
    "gender": {
      "type": "string",
    },
    "email": {
      "type": "string",
    },
    "phone": {
      "type": "object",
      "properties": {
        "main": {
          "type": "string",
        },
        "cell": {
          "type": "string",
        },
        "business": {
          "type": "string",
        },
      },
    },
    "address": {
      "type": "object",
      "properties": {
        "line1": {
          "type": "string",
        },
        "line2": {
          "type": "string",
        },
        "city": {
          "type": "string",
        },
        "state": {
          "type": "string",
        },
        "zip": {
          "type": "string",
        },
      },
    },
    "createdBy": {
      "type": "string",
    },
    "createdOn": {
      "type": "date",
    },
    "modifiedBy": {
      "type": "string",
    },
    "modifiedOn": {
      "type": "date",
    },
  },
}

var writeFilterSchema = {
  "title": "User Schema",
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string",
    },
    "lastName": {
      "type": "string",
    },
    "dateOfBirth": {
      "type": "date",
    },
    "gender": {
      "type": "string",
    },
    "email": {
      "type": "string",
    },
    "phone": {
      "type": "object",
      "properties": {
        "main": {
          "type": "string",
        },
        "cell": {
          "type": "string",
        },
        "business": {
          "type": "string",
        },
      },
    },
    "address": {
      "type": "object",
      "properties": {
        "line1": {
          "type": "string",
        },
        "line2": {
          "type": "string",
        },
        "city": {
          "type": "string",
        },
        "state": {
          "type": "string",
        },
        "zip": {
          "type": "string",
        },
      },
    },
  },
}

function findOne(user, id, callback) {
  getMembersFromChurches(user.churches, function (members) {
    Model
      .findOne({
        "_id": id
      })
  		.where({
        $or: [{
          "_id": {
            $in : members
          }
        }]
      })
      .exec(function(err, result) {
        return callback(result);
      });
  });
}

function findMany(user, callback) {
  getMembersFromChurches(user.churches, function (members) {
    Model
      .findOne()
  		.where({
        $or: [{
          "_id": {
            $in : members
          }
        }]
      })
      .exec(function(err, result) {
        if (!result) {
          return callback([]);
        } else {
          return callback(result);
        }
      });
  });
}

module.exports = new RestFilter({
  path: "/member",
  model: Model,
  readFilterSchema: readFilterSchema,
  writeFilterSchema: writeFilterSchema,
  findOne: findOne,
  findMany: findMany,
  securityRoles: {
    create: UserSecurity.isActiveUser,
    read: UserSecurity.isActiveUser,
    update: UserSecurity.isActiveUser,
    destroy: UserSecurity.isActiveUser,
  }
});
