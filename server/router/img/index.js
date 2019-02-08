var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

var _root = '../../images';

router.get('/favicon.ico', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/favicon.ico'));
});

router.get('*', function (req, res, next) {
	var fileName = path.join(__dirname, _root, '/' + req.originalUrl.replace('/img/',''));
	fs.stat(fileName, function (err, stat) {
		if (err == null) {
			res.type('video/mp4');
			res.sendFile(fileName);
		} else {
			fs.stat(fileName + '.png', function (err, stat) {
				if (err == null) {
					res.sendFile(fileName + '.png');
				} else {
					fs.stat(fileName + '.jpg', function (err, stat) {
						if (err == null) {
							res.sendFile(fileName + '.jpg');
						} else {
							fs.stat(fileName + '.jpeg', function (err, stat) {
								if (err == null) {
									res.sendFile(fileName + '.jpeg');
								} else {
									fs.stat(fileName + '.gif', function (err, stat) {
										if (err == null) {
											res.sendFile(fileName + '.gif');
										} else {
											fs.stat(fileName + '.svg', function (err, stat) {
												if (err == null) {
													res.sendFile(fileName + '.svg');
												} else {
													next();
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
		}
	});
});

module.exports = router;
