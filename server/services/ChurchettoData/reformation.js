var http = require('http');
var settings = require('./settings');

function Resetter () {
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

// requests a password reset and sends email to user's email
Resetter.prototype.requestPasswordReset = function(options, callback) {
    this.requestOptions = {
        host: settings.host,
        port: settings.port,
        path: '/forgot',
        method: 'POST',
        headers: {
            'email': options.email,
        }
    };
    this.callback = callback;

    this.genereateHttpRequest();
}

Resetter.prototype.resetPassword = function(options, callback) {
    this.requestOptions = {
        host: settings.host,
        port: settings.port,
        path: '/forgot/' + options.id,
        method: 'POST',
        headers: {
            'token': options.token,
            'password': options.password,
        }
    };
    this.callback = callback;

    this.genereateHttpRequest();
}

module.exports = Resetter;
