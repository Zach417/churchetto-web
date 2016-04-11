var express = require('express');
var router = express.Router();

router.use(require('./church'));
router.use(require('./user'));
router.use(require('./report'));

module.exports = router;
