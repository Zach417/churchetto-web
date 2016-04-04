var restful = require('node-restful');
var mongoose = restful.mongoose;

var schema = new mongoose.Schema({
  churchId: mongoose.Schema.ObjectId,
  eventId: mongoose.Schema.ObjectId,
  memberId: mongoose.Schema.ObjectId,
  email: String,
  token: String,
  roles: [String],
  sentOn: Date,
});

module.exports = restful.model('RequestVolunteers', schema);
