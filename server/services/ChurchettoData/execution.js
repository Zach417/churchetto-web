var http = require('http');
var httpOptions = require('./httpOptions');
var authentication = require('./authentication');
var service = require('./index');

function Executor () {
    this.callback = null;
    this.tryCount = 0;
    this.callbackCount = 0;
    this.json = {};
    this.options = {};
    this.requestOptions = {};
    this.httpRequest;
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
        } else if (this.chunks && this.callbackCount < 1) {
            this.callbackCount++;
            this.json = JSON.parse(this.chunks);
            return this.callback(this.json);
        } else if (this.chunks && this.callbackCount >= 1) {
            console.log("Service attempted to callback more than once.");
            return;
        } else if (this.tryCount === 1) {
            this.tryCount++;
            authentication.accessToken = null; // reset access token
            service.execute(this.options, this.callback); // try logging in again
        } else if (this.tryCount > 2 && this.tryCount <= 4) {
            this.tryCount++;
            this.genereateHttpRequest();
        } else if (this.tryCount > 5) {
            throw new Error("Error executing service: Maximum try count of 5 reached.");
        }
    }

    this.genereateHttpRequest = function () {
        this.httpRequest = http.request(this.requestOptions, function (res) {

            res.setEncoding('utf8');

            res.on('data', function (chunk) {
                this.httpOnData(chunk);
            }.bind(this));

            res.on('error', function(error) {
                console.log("Error executing service:", error.message);
            }.bind(this));

            res.on('end', function () {
                this.httpOnEnd();
            }.bind(this));

        }.bind(this));

        if (this.requestOptions.body) {
            return this.httpRequest.write(this.requestOptions.body);
        } else {
            return this.httpRequest.end();
        }
    }
};

Executor.prototype.request = function(options, callback) {
    this.options = options;
    this.requestOptions = httpOptions.generate(options);
    this.callback = callback;

    this.genereateHttpRequest();
}

module.exports = Executor;
