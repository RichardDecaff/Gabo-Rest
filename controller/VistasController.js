var http = require('http');
var ejs = require('ejs');
var fs = require('fs');

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use(express.static('./views'));

router.route('/').get(function(req, res) {
  fs.readFile('./views/login.html', 'utf-8', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var temp = "test";
    var renderedHtml = ejs.render(data, {temp: temp});
    res.end(renderedHtml);
    res.end();
  });
});

router.route('/agenda').get(function(req, res) {
  fs.readFile('./views/main.html', 'utf-8', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var temp = "test";
    var renderedHtml = ejs.render(data, {temp: temp});
    res.end(renderedHtml);
    res.end();
  });
});


module.exports = router;
