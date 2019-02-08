var moment = require('moment');
var restful = require('node-restful');
var mongoose = restful.mongoose;
var bcrypt = require('bcrypt-nodejs');

function createToken(callback) {
  require('crypto').randomBytes(128, function(ex, buf) {
    var token = buf.toString('hex');
    callback(token);
  });
}

var passwordResetSchema = new mongoose.Schema({
  email: String,
  token: String,
  attempts: Number,
  isExpired: Boolean,
  expiresOn: Date,
  createdOn: Date,
});

passwordResetSchema.methods.generateToken = function(callback) {
  createToken(function(tokenValue) {
    var encryptedToken = bcrypt.hashSync(tokenValue, bcrypt.genSaltSync(8), null);
    this.token = encryptedToken;
    this.save(function(err) {
      if (err) {
        console.log(err);
      }
    });
    callback(tokenValue);
  }.bind(this));
}

passwordResetSchema.methods.isValidToken = function(token) {
  if (this.get("isExpired") === true) {
    return false;
  }

  if (moment().toDate() > moment(this.get("expiresOn")).toDate()) {
    return false;
  }

  if (this.get("attempts") > 3) {
    this.isExpired = true;
    this.save(function(err) {
      if (err) {
        console.log(err);
      }
    });
    return false;
  }

  var result = bcrypt.compareSync(token, this.get("token"));
  if (result === false) {
    this.attempts++;
    this.save(function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
  return result;
}

module.exports = restful.model('PasswordReset', passwordResetSchema);