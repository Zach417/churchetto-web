var express = require('express');
var router = express.Router();

router.use('/member-directory', require('./memberDirectory'));

module.exports = router;
