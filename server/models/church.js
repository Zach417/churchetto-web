var restful = require('node-restful');
var mongoose = restful.mongoose;

var memberSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
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
  campuses: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Campus',
    unique: false,
    dropDups: false,
  }],
  members: [memberSchema],
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
