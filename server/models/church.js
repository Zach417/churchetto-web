var restful = require('node-restful');
var mongoose = restful.mongoose;

var contributionSchema = new mongoose.Schema({
  memberId: mongoose.Schema.ObjectId,
  date: Date,
  amount: Number,
  description: String,
  isTaxDeductible: Boolean,
});

var attendanceSchema = new mongoose.Schema({
  date: Date,
  category: String,
  count: Number,
});

var groupSchema = new mongoose.Schema({
  name: String,
  description: String,
  type: String,
  members: [{
    memberId: mongoose.Schema.ObjectId,
  }],
});

var eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  contact: String,
  starts: Date,
  ends: Date,
  notes: String,
  locationStarts: Date,
  locationEnds: Date,
  locationNotes: String,
  isAllDay: Boolean,
  status: String,
  group: mongoose.Schema.ObjectId,
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
  dateOfDeath: Date,
  dateOfMembership: Date,
  dateOfAnniversary: Date,
  dateOfFaithConfirmation: Date,
  dateOfFaithReaffirmation: Date,
  type: String, //contributor, attender
  maritalStatus: String, //married, single, divorced, widow, widower
  envelopeNumber: String,
  notes: String,
  baptizedOn: Date,
  occupation: String,
  employer: String,
  gender: String,
  email: String,
  family: String,
  familyRelationship: String,
  imagePath: String,
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
  addressAlternate: {
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
  contributions: [contributionSchema],
  attendance: [attendanceSchema],
  campuses: [campusSchema],
  members: [memberSchema],
  events: [eventSchema],
  groups: [groupSchema],
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
