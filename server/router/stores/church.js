var Model = require('../../models/church');
var RestFilter = require('../../components/RestFilter');
var UserSecurity = require('../../components/UserSecurity');

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
    "missionStatement": {
      "type": "string",
    },
    "visionStatement": {
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
    "members": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "_id": {
            "type":"string",
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
        },
      }
    },
    "campuses": {
      "type": "array",
      "items": {
        "type":"string",
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
    "missionStatement": {
      "type": "string",
    },
    "visionStatement": {
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
    "members": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "_id": {
            "type":"string",
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
        },
      }
    },
    "campuses": {
      "type": "array",
      "items": {
        "type":"string",
      },
    },
  },
}

function findOne(user, id, callback) {
  Model
    .findOne({
      "_id": id
    })
		.where({
      $or: [{
        "_id": {
          $in : user.churches
        }
      }, {
        "createdBy": user._id,
      }]
    })
    .exec(function(err, result) {
      return callback(result);
    });
}

function findMany(user, callback) {
  Model
    .find()
		.where({
      $or: [{
        "_id": {
          $in : user.churches
        }
      }, {
        "createdBy": user._id,
      }]
    })
    .exec(function(err, result) {
      return callback(result);
    });
}

module.exports = new RestFilter({
  path: "/church",
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
