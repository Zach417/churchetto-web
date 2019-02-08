var moment = require('moment');
var bcrypt = require('bcrypt-nodejs');

var User = require('../../models/user');
var PasswordReset = require('../../models/passwordReset');
var EmailSender = require('../../components/EmailSender');

function sendFailedJson(res) {
  res.json({
    success: false,
    message: 'Reset failed.'
  });
}

function sendSuccessJson(res) {
  res.json({
    success: true,
    message: "Success! If the specified email address exists in the database, an email with instructions to reset the password will be sent shortly.",
  });
}

module.exports = function(app) {
  app.post('/forgot-password', function(req, res) {
    var email = req.headers['email'];

    if (!email) {
      return sendFailedJson(res);
    }

    // check to see if any password reset requests have been made in the past 24 hours.
    // if one has been made, inform user to try again tomorrow
    // this protects against submitting reset form a ton of times in order to try to
    // guess the tokens to reset the passwords as they only have 3 attempts per request
    PasswordReset.find({
      "email": email,
      "createdOn": {
        "$gte": moment().subtract(2, 'hours'),
      }
    }, function(err, docs) {
      if (err) {
        throw err;
      }

      if (docs.length > 0) {
        return res.json({
          success: false,
          message: "A password reset request for that email has already been made in the past 2 hours. Please try again later.",
        });
      }

      // document inserted into passwordReset collection
      PasswordReset.create({
        "email": email,
        "attempts": 0,
        "isExpired": false,
        "expiresOn": moment().add(20, 'minutes').toDate(),
        "createdOn": moment().toDate(),
      }, function(err, passwordReset) {
        if (err) {
          console.log(err);
          return sendFailedJson(res);
        }

        // check if data is consistent with a given user in the users collection
        // if not, stop and don't inform user. ambiguity will defend against brute
        // force attacks
        User.findOne({
          "email": email,
        }, function(err, user) {
          if (err) {
            console.log(err);
            return sendFailedJson(res);
          }

          if (user) {
            // token generated, hashed, salted, and stored
            passwordReset.generateToken(function(token) {
              // link sent to user's email address to reset their password
              // and token automatically appended to link (which was stored in memory)
              var html = EmailSender.Emails.PasswordReset
                .replace(new RegExp("__LINK__", 'g'), "http://www.churchetto.com/forgot-password/" + passwordReset._id + "?token=" + token)
                .replace("__NAME__", user.firstName);
              var emailSender = new EmailSender({
                from: "zach@churchetto.com",
                to: user.email,
                subject: "Churchetto - Password Reset Request",
                html: html,
              });
              emailSender.send();
            });
          }

          return sendSuccessJson(res);
        });
      });
    });
  });

  app.post('/forgot-password/:id', function(req, res) {
    var token = req.headers['token'];
    var password = req.headers['password'];
    var id = req.params.id;

    if (!token || !id || !password) {
      return sendFailedJson(res);
    }

    if (password.length < 8) {
			return res.json({
				success: false,
				message: "Password length must be at least 8 characters.",
			});
    }

    if (password.length > 160) {
			return res.json({
				success: false,
				message: "Password length cannot be over 160 characters.",
			});
    }

    PasswordReset.findOne({
      "_id": id,
    }, function(err, passwordReset) {
      if (err) {
        console.log(err);
        return sendFailedJson(res);
      }

      if (passwordReset && passwordReset.isValidToken(token)) {
        User.findOne({
          "email": passwordReset.email
        }, function(err, user) {
          if (err) {
            throw err;
          }
          if (user) {
            user.password = user.generateHash(password);
            user.save(function(err) {
              if (err) {
                console.log(err);
              }
            });
            passwordReset.isExpired = true;
            passwordReset.save(function(err) {
              if (err) {
                console.log(err);
              }
            });
            return res.json({
              success: true,
              message: "Password was successfully changed.",
            });
          } else if (!user) {
            return sendFailedJson(res);
          }
        });
      } else {
        return sendFailedJson(res);
      }
    });
  });
}

/* ORIGINAL NOTES BELOW

// password reset form sent
// if data is consistent with a given user, they will be sent an email
{
	"email":"zallen@pension-consultants.com",
	"EIN":"12-3456789",
}

// check to see if any password reset requests have been made in the past 2 hours.
// if one has been made, inform user to try again tomorrow
// this protects against submitting reset form a ton of times in order to try to
// guess the tokens to reset the passwords as they only have 3 attempts per request

// however, upon success,
// document inserted into passwordReset collection and token (random 128 bytes) generated, hashed, salted, and stored
{
	"_id":"56cf4d5e89dgbfd343146ce8",
	"email":"zallen@pension-consultants.com",
	"token":"$2a$10$UwsUycWMzmgJBfeSUPMjROnil9xaH0krVX8e9gN7LKTHmyqemHkU6",
	"attempts":0,
	"isExpired":false,
	"expiresOn": new Date(2016,3,11,10,50),
	"createdOn": new Date(2016,3,11,10,30),
}

// check if data is consistent with a given user in the users collection
// if not, stop, don't inform user, and just do nothing else

// link sent to user's email address to reset their password
// and token automatically appended to link (which was stored in memory)
{
	"link":"https://planmanager.com/forgot/56cf4d5e89dgbfd343146ce8?token=v76CySwZDbl0crzmQwlT...",
	"body":"You have 20 minutes to reset your password before the link expires",
}

// user visits link

// if passwordReset document is expired, inform user that the attempt is expired and they must
// attempt to reset their password again via https://planmanager.com/reset

// if passwordReset document is active, user enters new password, and posts form
// it is important that the username/email is never displayed on this page
// in order to protect against randomly visiting reset page ids & tokens.
// this way, even if an id/token pair is guessed (highly unlikely), then they
// actually have no way of knowing for which user they just reset the password
{
	"_id":"56cf4d5e89dgbfd343146ce8",
	"token":"v76CySwZDbl0crzmQwlT",
	"password":"BroncosSuck417"
}

// password is reset in users collection
{
	"email":"zallen@pension-consultants.com",
	"password":"$2a$10$UwsUycWMzmgJBfeSUPMjROnil9xaH0krVX8e9gN7LKTHmyqemHkU6"
}

// user is redirected to login form
// again, email should never be displayed to protect against brute force attacks

// attempts is incremented by 1 if token is incorrect for passwordReset id
{
	"_id":"56cf4d5e89dgbfd343146ce8",
	"attempts":1,
}

// once attempts reach 3, isExpired is set to true
// so the next time they load the page, they will be informed
// that their attempt is expired and they must
// attempt to reset their password again via https://planmanager.com/forgot
// this protects against brute force attacks
{
	"_id":"56cf4d5e89dgbfd343146ce8",
	"attempts":3,
	"isExpired":true,
}

*/
