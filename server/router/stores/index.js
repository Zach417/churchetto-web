var express = require('express');
var router = express.Router();

router.use(require('./campus'));
router.use(require('./church'));
router.use(require('./lead'));
router.use(require('./member'));
router.use(require('./user'));

module.exports = router;
