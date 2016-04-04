var express = require('express');
var router = express.Router();

router.use('/favicon.ico', require('./favicon'));
router.use('/img', require('./img'));
router.use('/js', require('./js'));
router.use('/css', require('./css'));

router.use('/methods', require('./methods'));

router.use(require('./auth'));

router.use('/stores', require('./stores'));
router.use('/', require('./views'));

module.exports = router;
