var Model = require('../../models/report');
var RestFilter = require('../../components/RestFilter');
var UserSecurity = require('../../components/UserSecurity');

var objectArrayFilter = {
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "_id": { "type":"string" },
      "name": { "type":"string" },
      "value": { "type":"string" },
      "style": {
        "type": "object",
        "properties": {
          "fontSize": { "type":"string"},
          "textAlign": { "type":"string"},
          "top": { "type":"string"},
          "left": { "type":"string"},
          "width": { "type":"string"},
          "height": { "type":"string"},
          "color": { "type":"string" },
          "backgroundColor": { "type":"string"},
        },
      },
    },
  },
}

var segmentArrayFilter = {
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "name": { "type":"string"},
      "style": {
        "type": "object",
        "properties": {
          "height": { "type":"string" },
        },
      },
      "objects": objectArrayFilter,
    },
  },
}

var segmentsFilter = {
  "type": "object",
  "properties": {
    "page": {
      "type": "object",
      "properties": {
        "header": segmentArrayFilter,
        "footer": segmentArrayFilter,
      },
    },
    "report": {
      "type": "object",
      "properties": {
        "header": segmentArrayFilter,
        "footer": segmentArrayFilter,
      },
    },
    "body": {
      "type": "object",
      "properties": {
        "groups": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "entity": { "type":"string" },
              "attribute": { "type":"string" },
              "header": segmentArrayFilter,
              "footer": segmentArrayFilter,
            },
          },
        },
        "details": segmentArrayFilter,
      },
    },
  },
}

var readFilterSchema = {
  "title": "Report Read Schema",
  "type": "object",
  "properties": {
    "_id": { "type":"string" },
    "name": { "type":"string" },
    "style": {
      "type": "object",
      "properties": {
        "backgroundColor": { "type":"string"},
      },
    },
    "size": {
      "type": "object",
      "properties": {
        "x": { "type":"string"},
        "y": { "type":"string"},
      },
    },
    "segments": segmentsFilter,
    "createdBy": { "type":"string" },
    "createdOn": { "type": "date" },
    "modifiedBy": { "type":"string" },
    "modifiedOn": { "type": "date" },
  },
}

var writeFilterSchema = {
  "title": "Report Write Schema",
  "type": "object",
  "properties": {
    "name": { "type":"string" },
    "style": {
      "type": "object",
      "properties": {
        "backgroundColor": { "type":"string"},
      },
    },
    "size": {
      "type": "object",
      "properties": {
        "x": { "type":"string"},
        "y": { "type":"string"},
      },
    },
    "segments": segmentsFilter,
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
  path: "/report",
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
