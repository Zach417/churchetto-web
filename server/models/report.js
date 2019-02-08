var restful = require('node-restful');
var mongoose = restful.mongoose;

var styleSchema = new mongoose.Schema({
  fontSize: String,
  textAlign: String,
  top: String,
  left: String,
  width: String,
  height: String,
  color: String,
  backgroundColor: String,
});

var objectSchema = new mongoose.Schema({
  value: String, //{report.data.church.attendance.count.sum}
  style: styleSchema,
});

var segmentSchema = new mongoose.Schema({
  name: String,
  style: {
    height: String,
    backgroundColor: String,
  },
  objects: [objectSchema],
});

var schema = new mongoose.Schema({
  name: String, //Attendance by month
  style: {
    backgroundColor: String,
  },
  size: {
    x: String, //1654px
    y: String, //2339px
  },
  segments: {
    page: {
      header: [segmentSchema],
      footer: [segmentSchema],
    },
    report: {
      header: [segmentSchema],
      footer: [segmentSchema],
    },
    body: {
      groups: [{
        entity: String,
        attribute: String,
        header: [segmentSchema],
        footer: [segmentSchema],
      }],
      details: [segmentSchema],
    },
  },
  data: {
    entity: {
      name: String, //church
    },
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    unique: false,
    dropDups: false,
  },
  createdOn: Date,
  modifiedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    unique: false,
    dropDups: false,
  },
  modifiedOn: Date,
});

module.exports = restful.model('Report', schema);
