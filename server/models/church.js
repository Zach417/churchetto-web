var restful = require('node-restful');
var mongoose = restful.mongoose;

var schema = new mongoose.Schema({
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
  campuses: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Campus',
    unique: false,
    dropDups: false,
  }],
  members: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Member',
    unique: false,
    dropDups: false,
  }],
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
