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
    "contributions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "_id": {
            "type": "string",
          },
          "memberId": {
            "type": "string",
          },
          "date": {
            "type": "string",
          },
          "amount": {
            "type": "string",
          },
        },
      },
    },
    "attendance": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "_id": {
            "type": "string",
          },
          "date": {
            "type": "string",
          },
          "count": {
            "type": "string",
          },
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
          "title": {
            "type": "string",
          },
          "nickName": {
            "type": "string",
          },
          "dateOfBirth": {
            "type": "date",
          },
          "baptizedOn": {
            "type": "date",
          },
          "occupation": {
            "type": "string",
          },
          "employer": {
            "type": "string",
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
        "type": "object",
        "properties": {
          "_id": {
            "type":"string",
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
        },
      }
    },
    "events": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "_id": {
            "type":"string",
          },
          "name": {
            "type": "string",
          },
          "description": {
            "type": "string",
          },
          "starts": {
            "type": "date",
          },
          "ends": {
            "type": "date",
          },
          "isAllDay": {
            "type": "bool",
          },
          "group": {
            "type": "string",
          },
          "attendees": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "memberId": {
                  "type":"objectId",
                },
                "checkedInDate": {
                  "type":"date",
                },
              },
            },
          },
          "volunteers": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "memberId": {
                  "type":"objectId",
                },
                "role": {
                  "type":"string",
                },
              },
            },
          },
        },
      }
    },
    "groups": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "_id": {
            "type":"string",
          },
          "name": {
            "type": "string",
          },
          "description": {
            "type": "string",
          },
          "type": {
            "type": "string",
          },
          "members": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "memberId": {
                  "type":"string",
                },
              },
            },
          },
        },
      }
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
    "contributions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "_id": {
            "type": "string",
          },
          "memberId": {
            "type": "string",
          },
          "date": {
            "type": "string",
          },
          "amount": {
            "type": "string",
          },
        },
      },
    },
    "attendance": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "_id": {
            "type": "string",
          },
          "date": {
            "type": "string",
          },
          "count": {
            "type": "string",
          },
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
          "title": {
            "type": "string",
          },
          "nickName": {
            "type": "string",
          },
          "dateOfBirth": {
            "type": "date",
          },
          "baptizedOn": {
            "type": "date",
          },
          "occupation": {
            "type": "string",
          },
          "employer": {
            "type": "string",
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
        "type": "object",
        "properties": {
          "_id": {
            "type":"string",
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
        },
      },
    },
    "events": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "_id": {
            "type":"string",
          },
          "name": {
            "type": "string",
          },
          "description": {
            "type": "string",
          },
          "starts": {
            "type": "date",
          },
          "ends": {
            "type": "date",
          },
          "isAllDay": {
            "type": "bool",
          },
          "group": {
            "type": "string",
          },
          "attendees": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "memberId": {
                  "type":"objectId",
                },
                "checkedInDate": {
                  "type":"date",
                },
              },
            },
          },
          "volunteers": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "memberId": {
                  "type":"objectId",
                },
                "role": {
                  "type":"string",
                },
              },
            },
          },
        },
      }
    },
    "groups": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "_id": {
            "type":"string",
          },
          "name": {
            "type": "string",
          },
          "description": {
            "type": "string",
          },
          "type": {
            "type": "string",
          },
          "members": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "memberId": {
                  "type":"string",
                },
              },
            },
          },
        },
      }
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
