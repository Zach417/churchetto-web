var restful = require('node-restful');
var mongoose = restful.mongoose;

var schema = new mongoose.Schema({
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

module.exports = restful.model('Member', schema);
