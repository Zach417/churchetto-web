var path = require('path');
var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
	res.sendFile(path.join(__dirname, '/../', '/images/favicon.ico'));
});

module.exports = router;
