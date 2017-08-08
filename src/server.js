var express = require('express');
var app = express();
var cors = require('cors');
var util = require('util');

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

var users = require('./db/users');
app.post('/users', function(req, res) {
	console.log('/users')

	users.createUser(req, function(err, rows) {
		console.log('Err=' + err)
		console.log('rows=' + rows)
	});
})

app.post('/login', function(req, res) {

	console.log('----------------------------------------------')
	console.log('Proba zalogowania, username=' + req.body.username
			+ ' password=' + req.body.password);

	var result = users.login(req.body.username, req.body.password, function(
			err, rows) {

		// TODO if error

		if (rows) {
			var util = require('util');

			console.log(util.inspect(rows, {
				showHidden : true,
				depth : null
			}));
		}
		if (rows == 0) {
			console.log('Nieprawidlowe dane logowania.')

			res.status(400).send({
				message : 'nieprawidlowe dane logowania'
			});
		} else {
			console.log('rows=' + rows[0])
			console.log('Zalogowano uzytkownika: ' + req.body.username)

			res.send(rows[0]);
			if (rows.length == 1) {
				var row = rows[0];
				res.send(rows[0]);
			}
		}

	});

	console.log('Rezultat=' + result)

})

app.get('/users', function(req, res) {
	console.log('/users')

	users.getAll(function(err, rows) {
		res.send(rows);
	});
})

var admins = require('./db/admins');

var articles = require('./db/articles');

app.get('/articles', function(req, res) {
	console.log('articles')
	articles.getActive(function(err, rows) {
		res.send(rows);
	});
})

app.get('/deletedArticles', function(req, res) {
	console.log('deletedArticles')

	articles.getDeletedArticles(function(err, rows) {

		var util = require('util');

		console.log(util.inspect(rows, {
			showHidden : true,
			depth : null
		}));

		res.send(rows);
	});
})

app.post('/articles', function(req, res) {

	console.log('/articles')

	articles.createArticle(req.body.author, req.body.title, req.body.content,
			req.body.headline, req.body.fk_editor, function(err, rows) {

			});

})

app.post('/deleteArticle', function(req, res) {

	console.log('/deleteArticle')

	articles.deleteArticle(req.body.id, req.body.fk_editor,
			function(err, rows) {
				res.send('OK');
			});

})

app.post('/activateArticle', function(req, res) {

	console.log('/activateArticle')

	articles.setActiveArticle(req.body.id, req.body.fk_editor, function(err,
			rows) {
		res.send('OK');
	});

})

var fileUploader = require('./utils/file-uploader');
app.post('/upload', function(req, res) {

	console.log('/upload')

	console.log(util.inspect(req.files, {
		showHidden : true,
		depth : null
	}));

	fileUploader.uploadFile(req, res);

})

app.put('/articles', function(req, res) {

	console.log('/articles')

	articles.updateArticle(req.body.author, req.body.title, req.body.content,
			req.body.headline, req.body.fk_editor, req.body.id, function(err,
					rows) {

				console.log('Err=' + err)
				console.log('rows=' + rows)
			});

})

// todo michal co jesli nic nie znaleziono?
app.get('/article', function(req, res) {
	console.log('/article')

	articles.getArticle(req.query.id, function(err, rows) {

		if (rows == 0) {
			console.log('Nic nie znalazlem.')
		}

		if (rows) {
			var util = require('util');

			console.log(util.inspect(rows, {
				showHidden : true,
				depth : null
			}));

			console.log('Sending=' + rows)

			if (rows.length == 1) {
				var row = rows[0];
				res.send(rows[0]);
			}
		}

		// TODO return sth

	});
})

app.get('/articleHistory', function(req, res) {
	console.log('/articleHistory')

	articles.getArticleHistory(req.query.id, function(err, rows) {

		var util = require('util');

		console.log(util.inspect(rows, {
			showHidden : true,
			depth : null
		}));

		res.send(rows);
	});
})

var universities = require('./db/universities');

app.get('/universities', function(req, res) {
	console.log('/universities')

	universities.getByName(req.query.university, function(err, rows) {
		res.send(rows);
	});
})

var comments = require('./db/comments');

app.get('/allcomments', function(req, res) {
	console.log('/allcomments')

	comments.getAllComments(req.query.id, function(err, rows) {

		var util = require('util');

		console.log(util.inspect(rows, {
			showHidden : true,
			depth : null
		}));

		res.send(rows);
	});
})

app.get('/confirmedcomments', function(req, res) {
	console.log('/confirmedcomments')

	comments.getConfirmedComments(req.query.id, function(err, rows) {

		var util = require('util');

		console.log(util.inspect(rows, {
			showHidden : true,
			depth : null
		}));

		res.send(rows);
	});
})

app.post('/allcomments', function(req, res) {

	console.log('/post allcomments')

	comments.createComment(req.body.parentcomment, req.body.comment, req.body.fk_post, req.body.fk_user, 'Y', function(err,
			rows) {
		
		//ok
		comments.getAllComments(req.body.fk_post, function(err, rows) {
			res.send(rows);
		});
	});

})

app.post('/confirmedcomments', function(req, res) {

	console.log('/confirmedcomments')

	comments.createComment(req.body.parentcomment, req.body.comment, req.body.fk_post, req.body.fk_user, 'N', function(err,
			rows) {
		
		//ok
		comments.getConfirmedComments(req.body.fk_post, function(err, rows) {

			var util = require('util');

			console.log(util.inspect(rows, {
				showHidden : true,
				depth : null
			}));

			res.send(rows);
		});
	});

})

// var smtpServer = require('./utils/smtp-server');
//
// var emailSender = require('./utils/email');
//
// app.get('/email', function(req, res) {
// console.log('email')
//
// emailSender.sendEmail();
// })

var config = require('./config');

var mailer = require('./utils/mailer');

app.get('/email', function(req, res) {
	console.log('/email')

	mailer.sendEmail();
})

app.post('/contactMessage', function(req, res) {

	console.log('/contactMessage')

	// TODO czy dodac do bazy?

	mailer.sendMessageEmail(req.body.name, req.body.email, req.body.subject,
			req.body.message);

	res.send('OK');
})

app.get('/image', function(req, res) {
	// req.params.id
	res.sendFile('dywan.jpg', {
		root : './uploads',
		headers : {
			'Content-Type' : 'image/jpeg'
		}
	}, function(err) {
		if (err) {
			console.log('err')
			throw err;
		} else
			console.log('sent')
	})
})

db.connect();

var server = app.listen(3000, function() {
	var host = server.address().address
	var port = server.address().port

	console.log("Listening at http://%s:%s", host, port)
})