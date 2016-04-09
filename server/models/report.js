var restful = require('node-restful');
var mongoose = restful.mongoose;

var objectSchema = new mongoose.Schema({
  style: mongoose.Schema.Mixed,
  position: {
    x: Number, //0px
    y: Number, //0px
  },
  size: {
    x: Number, //1654px
    y: Number, //500px
  },
  key: String, //{report.data.church.attendance.count.sum}
});

var segmentSchema = new mongoose.Schema({
  size: {
    y: Number, //500px
  },
  style: mongoose.Schema.Mixed,
  objects: [objectSchema],
});

var groupSchema = new mongoose.Schema({
  key: String, //{report.data.church.attendance.date.month}
  segments: [segmentSchema],
});

var schema = new mongoose.Schema({
  name: String, //Attendance by month
  style: mongoose.Schema.Mixed,
  size: {
    x: Number, //1654px
    y: Number, //2339px
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
    body: [{
      groups: [groupSchema],
      detail: [segmentSchema],
    }],
  },
  data: {
    entity: {
      name: String, //church
      fields: [mongoose.Schema.Mixed],
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
