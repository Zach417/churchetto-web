var express = require('express');
var router = express.Router();
var path = require('path');

var _root = '../../images';

router.get('/favicon.ico', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/favicon.ico'));
});

router.get('/wait', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/wait.gif'));
});

router.get('/logo-icon', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/logo-icon.png'));
});

router.get('/mkt/home-dashboard', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/mkt/home-dashboard.png'));
});

router.get('/mkt/volunteering', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/mkt/volunteering.png'));
});

router.get('/mkt/church-members', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/mkt/church-members.png'));
});

module.exports = router;
