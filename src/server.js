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

	enrolments.createEnrolment(req.body.name, req.body.surname, req.body.date,
			req.body.email, function(err, rows) {

				console.log('Err=' + err)
				console.log('rows=' + rows)
			});

})

var admins = require('./db/admins');

app.post('/login', function(req, res) {

	console.log('----------------------------------------------')
	console.log('Proba zalogowania, username=' + req.body.username
			+ ' password=' + req.body.password);

	var result = admins.login(req.body.username, req.body.password, function(
			err, rows) {

		// TODO if error

		if (rows == 0) {
			console.log('Nieprawidlowe dane logowania.')
			res.send('NOK');
		} else {
			console.log('rows=' + rows)
			console.log('Zalogowano uzytkownika: ' + req.body.username)
			res.send('OK');
		}

	});

	console.log('Rezultat=' + result)

})

db.connect();

var server = app.listen(3000, function() {
	var host = server.address().address
	var port = server.address().port

	console.log("Listening at http://%s:%s", host, port)
})