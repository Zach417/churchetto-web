var cluster = require('cluster');
var numberOfCPUs = require('os').cpus().length;

cluster.setupMaster({ exec: 'server.js' });

for (var i = 0; i < numberOfCPUs; i++) {
	cluster.fork();
}

process.on('SIGHUP', function () {
	cluster.workers.forEach(function (worker) {
		worker.disconnect();
		cluster.fork();
	});
});
