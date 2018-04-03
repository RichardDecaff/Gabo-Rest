var app = require('./app');
var port = process.env.PORT || 8080;
var cluster = require('express-cluster');

cluster(function(worker) {
  return app.listen(port, function() {
    console.log('Express server listening on port ' + port +' serving worker '+worker.id);
  });
}, {count: 5})

/*
var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
*/
