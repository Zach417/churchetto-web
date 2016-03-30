var Model = require('../../models/church');
var RestFilter = require('../../components/RestFilter');
var UserSecurity = require('../../components/UserSecurity');
var Church = require('../../models/church');

function getCampusesFromChurches(churches, callback) {
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
      var campuses = [];
      for (var i = 0; i < result.length; i++) {
        for (var j = 0; j < result[i].campuses.length; j++) {
          campuses.push(result[i].campuses[j]);
        }
      }
      return callback(campuses);
    });
}

var readFilterSchema = {
  "title": "User Schema",
  "type": "object",
  "properties": {
    "_id": {
      "type": "string",
    },
    "name": {
      "type": "string",
    },
    "website": {
      "type": "string",
    },
    "phone": {
      "type": "object",
      "properties": {
        "main": {
          "type": "string",
        },
      },
    },
    "fax": {
      "type": "object",
      "properties": {
        "main": {
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
    "name": {
      "type": "string",
    },
    "website": {
      "type": "string",
    },
    "phone": {
      "type": "object",
      "properties": {
        "main": {
          "type": "string",
        },
      },
    },
    "fax": {
      "type": "object",
      "properties": {
        "main": {
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
  getCampusesFromChurches(user.churches, function (campuses) {
    Model
      .findOne({
        "_id": id
      })
  		.where({
        $or: [{
          "_id": {
            $in : campuses
          }
        }]
      })
      .exec(function(err, result) {
        return callback(result);
      });
  });
}

function findMany(user, callback) {
  getCampusesFromChurches(user.churches, function (campuses) {
    Model
      .find()
  		.where({
        $or: [{
          "_id": {
            $in : campuses
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
  path: "/campus",
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
