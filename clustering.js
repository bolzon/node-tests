'use strict';

const http = require('http');
const cluster = require('cluster');

if (cluster.isMaster) {
  require('os').cpus().forEach(() => {
    cluster.fork();
  });

  const workersList = Object.values(cluster.workers);
  workersList.forEach(worker => {
    worker.on('message', message => {
      console.log(`${worker.id}/${workersList.length}: ${message}`);
    });
  });
} else {
  http.Server((req, res) => {
    res.writeHead(200);
    res.end('hello world');

    process.send('Hi');
  }).listen(3000);
}
