var express = require('express');
var router = express.Router();

require('./resetPassword') (router);
require('./signIn') (router);
require('./signUp') (router);
require('./signOut') (router);

module.exports = router;
