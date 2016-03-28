var restful = require('node-restful');
var mongoose = restful.mongoose;

var tokenSchema = new mongoose.Schema({
  value: String,
  createdOn: Date,
});

// exports just the mongoose schema.
module.exports = tokenSchema;