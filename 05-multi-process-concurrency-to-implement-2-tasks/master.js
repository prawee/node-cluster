const numCPUs = require('os').cpus().length;

module.exports = exuteFibo;

function exuteFibo() {
  return (new Promise(
    function (resolve, reject) {
      var cluster = require('cluster');
      var result = [];
      cluster.setupMaster({
        exec: 'worker.js',
        slient: true
      });

      var collection = [44, 42, 42, 43];
      var st = Date.now();
      for (var i=0; i < Math.min(numCPUs, collection.length); i++) {
        var wk = cluster.fork();
        wk.send(collection[i]);
      }

      cluster.on('fork', function(worker) {
        console.log(`[master]: fork worker ${worker.id}`);
      });

      cluster.on('exit', function(worker, code, signal) {
        console.log(`[master]: worker ${worker.id} died`);
      });

      var numOfComplete = 0;
      Object.keys(cluster.workers).forEach(function (id) {
        cluster.workers[id].on('message', function (msg) {
          console.log(`[master] receive message from [worker${id}] : ${msg}`);
          result.push(msg);
          numOfComplete++;
        
          if (numOfComplete === collection.length) {
            console.log(`[master] finish all work and using ${Date.now() - st} ms`);
            cluster.disconnect();
            resolve(result);
          }
        });
      });
    }
  ));
};
