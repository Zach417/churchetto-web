var http = require('http');

var settings = require('./settings');

function Authenticator () {
    this.callback;
    this.requestOptions = {};
    this.chunks;

    this.httpOnData = function (chunk) {
        if (!this.chunks) {
            this.chunks = chunk;
        } else {
            this.chunks += chunk;
        }
    }

    this.httpOnEnd = function () {
        if (!this.chunks) {
            return this.callback({});
        } else {
            return this.callback(this.chunks);
        }
    }

    this.genereateHttpRequest = function () {
        this.httpRequest = http.request(this.requestOptions, function (res) {

            res.setEncoding('utf8');

            res.on('data', function (chunk) {
                this.httpOnData(chunk);
            }.bind(this));

            res.on('error', function(error) {
                console.log("Error executing plan manager service:", error.message);
            }.bind(this));

            res.on('end', function () {
                this.httpOnEnd();
            }.bind(this));

        }.bind(this));

        this.httpRequest.end();
    }
}

// authenticates and gets access token
Authenticator.prototype.login = function(options, callback) {
    this.requestOptions = {
        host: settings.host,
        port: settings.port,
        path: '/login',
        method: 'POST',
        headers: {
            'email': options.email,
            'password': options.password
        }
    };
    this.callback = callback;

    this.genereateHttpRequest();
}

module.exports = Authenticator;