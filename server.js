var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();
var config = JSON.parse(fs.readFileSync(path.join(__dirname, "config.json"), "utf8"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(config.cookieParser.secret));

app.use(function (req, res, next) {
  console.log(req.method + req.path);
	next();
});

require('./server/config/session') (app);
app.use('/', require('./server/router'));

app.listen(80);
console.log('Churchetto Web on port 80');
