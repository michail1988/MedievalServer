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

var bodyParser = require('body-parser')

// Tell express to use the body-parser middleware and to not parse extended
// bodies
app.use(bodyParser.urlencoded({
	extended : false
}))
app.use(bodyParser.json())

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

	req.on('data', function(chunk) {
		var bodydata = chunk.toString('utf8');
		console.log(bodydata)
	});

	console.log('wywolano post, req.body=' + req.body)
	console.log('wywolano post, req.body.name=' + req.body.name)
	console.log('wywolano post, req.body.surname=' + req.body.surname)
	console.log('wywolano post, req.body.date=' + req.body.date)
	console.log('wywolano post, req.body.email=' + req.body.email)

	enrolments.createEnrolment(req.body.name, req.body.surname, req.body.date,
			req.body.email, function(err, rows) {
		
		console.log('Err=' + err)
				console.log('rows=' + rows)
			});

})

db.connect();

var server = app.listen(3000, function() {
	var host = server.address().address
	var port = server.address().port

	console.log("Listening at http://%s:%s", host, port)
})