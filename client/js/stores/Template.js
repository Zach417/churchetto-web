// A little recursive magic to ensure that unnecessary requests
// aren't sent to the server. I should probably decouple this into
// it's own component at some point.

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

module.exports = function (PlanManagerService) {

    this._docs = [];
    this._requests = [];
    this._ignore = false;

    this.executeRemainingRequests = function() {
    	if (this._requests.length > 0) {
    		for (var i = 0; i < this._requests.length; i++) {
                var request = this._requests[i];

                if (request.parameters["id"] && request.parameters["callback"]) {
                    request.execute(request.parameters["id"], request.parameters["callback"]);
                } else if (request.parameters["callback"]) {
                    request.execute(request.parameters["callback"]);
                } else {
    			    request.execute();
                }
    		}

    		this._requests = [];
    	}
    }

    this.get = function (callback, refresh) {

        if (this._docs.length === 0 || refresh === true) {
            if (this._ignore === true) {
                var parameters = [];
                parameters["callback"] = callback;

                return this._requests.push({
                    execute: this.get,
                    parameters: parameters,
                });
            } else {
                this._ignore = true;
            }

            PlanManagerService.get(function (docs) {
                this._ignore = false;
                this._docs = docs;
                callback(this._docs);

                this.executeRemainingRequests();
            }.bind(this));
        } else {
            callback(this._docs);
        }
    }.bind(this);

    this.getOne = function (id, callback, refresh) {

        if (this._docs.length === 0 || refresh === true) {
            if (this._ignore === true) {
                var parameters = [];
                parameters["id"] = id;
                parameters["callback"] = callback;
                return this._requests.push({
                    execute: this.getOne,
                    parameters: parameters,
                });
            } else {
                this._ignore = true;
            }

            PlanManagerService.get(function (docs) {
                this._ignore = false;
                this._docs = docs;

                var calledBack = false;

                for (var i = 0; i < this._docs.length; i++) {
                    if (this._docs[i]._id == id) {
                        callback(this._docs[i]);
                        calledBack = true;
                    }
                }

                if (!calledBack) {
                    callback({});
                }

                this.executeRemainingRequests();
            }.bind(this));
        } else {
            for (var i = 0; i < this._docs.length; i++) {
                if (this._docs[i]._id == id) {
                    return callback(this._docs[i]);
                }
            }
        }
    }.bind(this);

    this.Store = assign({}, EventEmitter.prototype, {
    	get: this.get,
    	getOne: this.getOne,

    	insert: function (doc, callback) {
    		PlanManagerService.insert(doc, callback);
    	},

    	update: function (doc, callback) {
    		PlanManagerService.update(doc, callback);
    	},

    	delete: function (doc, callback) {
    		PlanManagerService.delete(doc, callback);
    	},

    	emitChange: function() {
            this.get(function (docs) {
                this.emit(CHANGE_EVENT);
            }.bind(this), true);
    	},

    	addChangeListener: function(callback) {
    		this.on(CHANGE_EVENT, callback);
    	},

    	removeChangeListener: function(callback) {
    		this.removeListener(CHANGE_EVENT, callback);
    	}
    });

    return this.Store;

}
