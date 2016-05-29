var express = require('express');
var router = express.Router();

router.use('/member-directory', require('./memberDirectory'));
router.use('/tax-statement', require('./taxStatement'));

module.exports = router;
