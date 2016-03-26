var fs = require('fs');
var path = require('path');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var config = JSON.parse(fs.readFileSync(path.join(__dirname, "../..", "config.json"), "utf8"));

var sessionStore = new MongoStore({
		url: config.session.store.url
});

module.exports = function (app) {
	app.use(session({
		secret: config.session.secret,
		resave: false,
		saveUninitialized: true,
		cookie: {
			//secure: true, // only for https sites
			maxAge: 365 * 24 * 60 * 60 * 1000, // one year
		},
	    store: sessionStore,
	}));
}
