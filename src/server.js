var express = require('express');
var app = express();

var db = require('./db')

app.get('/', function (req, res) {
   res.send('Hello World');
})

var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Listening at http://%s:%s", host, port)
})