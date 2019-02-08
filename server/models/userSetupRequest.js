var moment = require('moment');
var restful = require('node-restful');
var mongoose = restful.mongoose;
var bcrypt = require('bcrypt-nodejs');
var EmailSender = require('../components/EmailSender');

function createToken(callback) {
  require('crypto').randomBytes(128, function(ex, buf) {
    var token = buf.toString('hex');
    callback(token);
  });
}

var userSetupRequestSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  token: String,
  attempts: Number,
  isExpired: Boolean,
  createdOn: Date,
});

userSetupRequestSchema.methods.generateTokenAndSendEmail = function(callback) {
  String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
  };

  createToken(function(tokenValue) {
    var encryptedToken = bcrypt.hashSync(tokenValue, bcrypt.genSaltSync(8), null);
    this.token = encryptedToken;
    this.save(function(err) {
      if (err) {
        console.log(err);
      }
    });
    var html = EmailSender.Emails.UserSetupRequest
      .replace(new RegExp("__LINK__", 'g'), "http://www.churchetto.com/sign-up/" + this._id + "?token=" + tokenValue)
      .replace("__NAME__", this.firstName);
    var emailSender = new EmailSender({
      from: "zach@churchetto.com",
      to: this.email,
      subject: "Churchetto - Email Verification",
      html: html,
    });
    emailSender.send();
    callback();
  }.bind(this));
}

userSetupRequestSchema.methods.isValidToken = function(token) {
  if (this.get("isExpired") === true) {
    return false;
  }

  if (this.get("attempts") > 25) {
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

    if (!this.attempts) {
      this.attempts = 0
    } else {
      this.attempts++;
    }

    this.save(function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
  return result;
}

userSetupRequestSchema.methods.sendEmail = function(userSetupRequest) {}

module.exports = restful.model('UserSetupRequest', userSetupRequestSchema);
