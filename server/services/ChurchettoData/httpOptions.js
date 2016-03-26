var settings = require('./settings');

var _options = {};

function clear () {
    _options = {};
}

function set (options) {
	if (options.path) {
		_options.path = options.path;
	}

	if (options.method) {
		_options.method = options.method;
	}

	if (options.body) {
		_options.body = JSON.stringify(options.body);
	}

    if (options.headers && options.body) {
        _options.headers = {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(_options.body, 'utf-8'),
            'email': options.headers.email,
            'access-token': options.headers.accessToken,
        };
    }

    if (options.headers && !options.body) {
        _options.headers = {
            'email': options.headers.email,
            'access-token': options.headers.accessToken,
        };
    }
}

function verify (options) {
	if (!options.body) {
		return;
	}

    try {
    	JSON.parse(JSON.stringify(options.body));
    } catch (err) {
        console.log(options.body);
    	throw "Body is not JSON object.";
    }
}

function prepare() {
    if (_options.body) {
        return {
            host: settings.host,
            port: settings.port,
            path: _options.path,
            method: _options.method,
            headers: _options.headers,
            body: _options.body
        };
    } else {
        return {
            host: settings.host,
            port: settings.port,
            path: _options.path,
            method: _options.method,
            headers: _options.headers,
        };
    }
}

module.exports.generate = function (options) {
    clear();
    verify(options);
    set(options);
    return prepare();
}