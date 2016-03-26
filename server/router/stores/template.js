var express = require('express');
var bodyParser = require('body-parser');

var churchettoDataService = require('../../services/ChurchettoData');

function Store (entity, schema) {

	var router = express.Router();

	router.use('/:id', function (req, res, next) {
		if (!req.session || !req.cookies.accessToken) {
			return next();
		}

		var options = {
			path: '/'+ entity + '/' + req.params.id,
			method: req.method,
	        headers: {
	            email: req.session.email,
	            accessToken: req.cookies.accessToken,
	        },
			body: req.body,
		}

	    churchettoDataService.execute(options, function (json) {
	    	try {
	    		if (res.json.success === false) {
    				req.session.destroy(function (err) {
    					console.log(err);
    				});
	    		} else {
	    			return res.json(json);
	    		}
	    	} catch (err) {
	    		console.log("Error executing plan manager service:", err);
	    		return next();
	    	}
	    });
	});

	router.use('/', function (req, res, next) {
		if (!req.session || !req.cookies.accessToken) {
			return next();
		}

		var options = {
			path: '/' + entity + '/',
			method: req.method,
	        headers: {
	            email: req.session.email,
	            accessToken: req.cookies.accessToken,
	        },
			body: req.body,
		}

	    churchettoDataService.execute(options, function (json) {
	    	try {
	    		if (res.json.success === false) {
	    			req.session.destroy(function (err) {
	    				console.log(err);
	    			});
	    		} else {
	    			return res.json(json);
	    		}
	    	} catch (err) {
	    		console.log("Error executing plan manager service:", err);
	    		return next();
	    	}
	    });
	});

	return router;

}

module.exports = Store;
