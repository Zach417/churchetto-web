var restful = require('node-restful');
var mongoose = restful.mongoose;

var eventsSchema = new mongoose.Schema({
  name: String,
  description: String,
  starts: Date,
  ends: Date,
  isAllDay: Boolean,
  attendees: [{
    memberId: mongoose.Schema.ObjectId,
    checkedInDate: Date,
  }],
  volunteers: [{
    memberId: mongoose.Schema.ObjectId,
    role: String,
  }]
});

var memberSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  nickName: String,
  title: String,
  dateOfBirth: Date,
  baptizedOn: Date,
  occupation: String,
  employer: String,
  gender: String,
  email: String,
  phone: {
    main: String,
    cell: String,
    business: String,
  },
  address: {
    line1: String,
    line2: String,
    city: String,
    state: String,
    zip: String,
  },
});

var campusSchema = new mongoose.Schema({
  name: String,
  website: String,
  phone: {
    main: String,
  },
  fax: {
    main: String,
  },
  address: {
    line1: String,
    line2: String,
    city: String,
    state: String,
    zip: String,
  },
});

var schema = new mongoose.Schema({
  name: String,
  website: String,
  missionStatement: String,
  visionStatement: String,
  phone: {
    main: String,
  },
  fax: {
    main: String,
  },
  address: {
    line1: String,
    line2: String,
    city: String,
    state: String,
    zip: String,
  },
  campuses: [campusSchema],
  members: [memberSchema],
  events: [eventsSchema],
  leads: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Lead',
    unique: false,
    dropDups: false,
  }],
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

module.exports = restful.model('Church', schema);