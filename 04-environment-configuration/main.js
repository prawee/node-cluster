console.log('####====START====####');
var exuteFibo = require('./master');
var st = Date.now();

exuteFibo().then(function (result) {
  console.log(`Finish all work and using ${Date.now() - st} ms`);
  console.log(`####Get result from multiple-processes: ${result}`);
});
