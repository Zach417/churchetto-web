var express = require('express');
var router = express.Router();

router.use('/stores', function(req, res, next) {
  var email = req.headers['email'];
  var token = req.headers['access-token'];

  if (!email || !token) {
    return sendAuthorizationFailedJson(res);
  }

  User.getUserFromEmail(email, function(user) {
    if (!user) {
      return sendAuthorizationFailedJson(res);
    }

    if (user.isValidToken(token)) {
      next();
    } else {
  		req.session.destroy(function(err) {
  			console.log(err);
  		});
  		res.clearCookie('accessToken');
      return res.redirect('/sign-in');
    }
  });
});

require('./resetPassword') (router);
require('./signIn') (router);
require('./signUp') (router);
require('./signOut') (router);

module.exports = router;
