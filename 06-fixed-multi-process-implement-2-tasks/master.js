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
      var workerId = [];
      for (var i=0; i < Math.min(numCPUs, collection.length); i++) {
        var wk = cluster.fork();
        workerId.push(wk.id);
        wk.send(collection[i]);
      }

      cluster.on('fork', function(worker) {
        if (workerId.indexOf(worker.id) !== -1) {
          console.log(`[master ${process.pid}]: fork worker ${worker.id}`);
        }
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
            workerId.forEach(function(id) {
              if (!cluster.workers[id].suicide) {
                cluster.workers[id].disconnect();
              }
            });  
            resolve(result);
          }
        });
      });
    }
  ));
};
