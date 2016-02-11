var gzippo = require('gzippo');
var express = require('express');
var logger = require('morgan');
var app = express();

app.use(logger('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));

var server = app.listen(process.env.PORT || 5000, function () {
  var port = server.address().port;
  console.log('Example app listening at http://localhost:%s', port);
});
