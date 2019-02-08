var express = require('express');
var router = express.Router();
var path = require('path');

var _root = '../../../client';

router.use(function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/build/style.min.css'));
});

module.exports = router;
