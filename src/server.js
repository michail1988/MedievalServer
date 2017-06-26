var express = require('express');
var app = express();
var cors = require('cors');

var db = require('./db');

var enrolments = require('./db/enrolments');

app.get('/', function(req, res) {
	res.send('Hello World');

	console.log('Byl request')
})

app.get('/enrolments', function(req, res) {
	console.log('/enrolments')
	
	enrolments.getAll(function(err,
			rows) {
		res.send(rows);
	});
})


db.connect();

var server = app.listen(3000, function() {
	var host = server.address().address
	var port = server.address().port

	console.log("Listening at http://%s:%s", host, port)
})