var express = require('express');
var app = express();
var cors = require('cors');

var originsWhitelist = [ 'http://localhost:4200', // this is my front-end url
													// for development
'http://www.myproductionurl.com' ];
var corsOptions = {
	origin : function(origin, callback) {
		var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
		callback(null, isWhitelisted);
	},
	credentials : true
}

// here is the magic
app.use(cors(corsOptions));

var db = require('./db');

var enrolments = require('./db/enrolments');

app.get('/', function(req, res) {
	res.send('Hello World');

	console.log('Byl request')
})

app.get('/enrolments', function(req, res) {
	console.log('/enrolments')

	enrolments.getAll(function(err, rows) {
		res.send(rows);
	});
})

app.post('/enrolments', function(req, res) {
	console.log('/wywolano post, req=' + req)

	res.send('dziekuje');
})

db.connect();

var server = app.listen(3000, function() {
	var host = server.address().address
	var port = server.address().port

	console.log("Listening at http://%s:%s", host, port)
})