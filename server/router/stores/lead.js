var Model = require('../../models/lead');
var RestFilter = require('../../components/RestFilter');
var UserSecurity = require('../../components/UserSecurity');
var Church = require('../../models/church');

function getLeadsFromChurches(churches, callback) {
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
      var leads = [];
      for (var i = 0; i < result.length; i++) {
        for (var j = 0; j < result[i].leads.length; j++) {
          leads.push(result[i].leads[j]);
        }
      }
      return callback(leads);
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
  getLeadsFromChurches(user.churches, function (leads) {
    Model
      .findOne({
        "_id": id
      })
  		.where({
        $or: [{
          "_id": {
            $in : leads
          }
        }]
      })
      .exec(function(err, result) {
        return callback(result);
      });
  });
}

function findMany(user, callback) {
  getLeadsFromChurches(user.churches, function (leads) {
    Model
      .findOne()
  		.where({
        $or: [{
          "_id": {
            $in : leads
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
  path: "/lead",
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
