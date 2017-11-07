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
//app.use(bodyParser.urlencoded({
//	extended : false,
//	limit: '50mb'
//}))
//app.use(bodyParser.json())
//
//app.use(express.bodyParser({limit: '50mb'}));

// dla przesylania contentu worda z p-editor 
//https://stackoverflow.com/questions/19917401/error-request-entity-too-large
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

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

			console.log('Znalazlem tyle wierszy=' + rows.length)
//			res.send(rows[0]);
			if (rows.length == 1) {
				var row = rows[0];
				res.send(rows[0]);
				
				console.log('Wyslano.')
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

app.get('/acceptedUsers', function(req, res) {
	console.log('/acceptedUsers')

	users.getAccepted(function(err, rows) {
		res.send(rows);
	});
})

app.get('/notAcceptedUsers', function(req, res) {
	console.log('/notAcceptedUsers')

	users.getNotAccepted(function(err, rows) {
		res.send(rows);
	});
})

app.get('/speakers', function(req, res) {
	console.log('/speakers')

	users.getSpeakers(function(err, rows) {
		res.send(rows);
	});
})


// todo michal co jesli nic nie znaleziono?
app.get('/user', function(req, res) {
	console.log('/user')

	users.getUser(req.query.id, function(err, rows) {

		if (rows == 0) {
			console.log('Nic nie znalazlem.')
		}

		if (rows) {
			var util = require('util');

			console.log(util.inspect(rows, {
				showHidden : true,
				depth : null
			}));

			if (rows.length == 1) {
				var row = rows[0];
				res.send(rows[0]);
			}
		}

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

var news = require('./db/news');

app.get('/allnews', function(req, res) {
	console.log('allnews')
	news.getActive(function(err, rows) {
		res.send(rows);
	});
})

app.get('/deletedNews', function(req, res) {
	console.log('deletedNews')

	news.getDeletedNews(function(err, rows) {

		var util = require('util');

		console.log(util.inspect(rows, {
			showHidden : true,
			depth : null
		}));

		res.send(rows);
	});
})

app.post('/news', function(req, res) {

	console.log('/news')

	news.createNews(req.body.author, req.body.title, req.body.content,
			req.body.headline, req.body.fk_editor, function(err, rows) {

			});

})

app.post('/deleteNews', function(req, res) {

	console.log('/deleteNews')

	news.deleteNews(req.body.id, req.body.fk_editor, function(err, rows) {
		res.send('OK');
	});

})

app.post('/activateNews', function(req, res) {

	console.log('/activateNews')

	news.setActiveNews(req.body.id, req.body.fk_editor, function(err, rows) {
		res.send('OK');
	});

})

app.put('/news', function(req, res) {

	console.log('/news')

	news.updateNews(req.body.author, req.body.title, req.body.content,
			req.body.headline, req.body.fk_editor, req.body.id, function(err,
					rows) {

				console.log('Err=' + err)
				console.log('rows=' + rows)
			});

})

// todo michal co jesli nic nie znaleziono?
app.get('/news', function(req, res) {
	console.log('/news')

	news.getNews(req.query.id, function(err, rows) {

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

app.get('/newsHistory', function(req, res) {
	console.log('/newsHistory')

	news.getNewsHistory(req.query.id, function(err, rows) {

		var util = require('util');

		console.log(util.inspect(rows, {
			showHidden : true,
			depth : null
		}));

		res.send(rows);
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

var articleComments = require('./db/articleComments');

app.get('/allArticleComments', function(req, res) {
	console.log('/allArticleComments')

	articleComments.getAllComments(req.query.id, function(err, rows) {

		var util = require('util');

		console.log(util.inspect(rows, {
			showHidden : true,
			depth : null
		}));

		res.send(rows);
	});
})

app.get('/confirmedArticleComments', function(req, res) {
	console.log('/confirmedArticleComments')

	articleComments.getConfirmedComments(req.query.id, function(err, rows) {

		var util = require('util');

		console.log(util.inspect(rows, {
			showHidden : true,
			depth : null
		}));

		res.send(rows);
	});
})

app.post('/allArticleComments', function(req, res) {

	console.log('/post allArticleComments')

	articleComments.createComment(req.body.parentcomment, req.body.comment,
			req.body.fk_post, req.body.fk_user, 'Y', function(err, rows) {

				// ok
		articleComments.getAllComments(req.body.fk_post, function(err, rows) {
					res.send(rows);
				});
			});

})

app.post('/confirmedArticleComments', function(req, res) {

	console.log('/confirmedArticleComments')

	articleComments.createComment(req.body.parentcomment, req.body.comment,
			req.body.fk_post, req.body.fk_user, 'N', function(err, rows) {

				// ok
				comments.getConfirmedComments(req.body.fk_post, function(err,
						rows) {

					var util = require('util');

					console.log(util.inspect(rows, {
						showHidden : true,
						depth : null
					}));

					res.send(rows);
				});
			});

})

var newsComments = require('./db/newsComments');

app.get('/allNewsComments', function(req, res) {
	console.log('/allNewsComments')

	newsComments.getAllComments(req.query.id, function(err, rows) {

		var util = require('util');

		console.log(util.inspect(rows, {
			showHidden : true,
			depth : null
		}));

		res.send(rows);
	});
})

app.get('/confirmedNewsComments', function(req, res) {
	console.log('/confirmedNewsComments')

	newsComments.getConfirmedComments(req.query.id, function(err, rows) {

		var util = require('util');

		console.log(util.inspect(rows, {
			showHidden : true,
			depth : null
		}));

		res.send(rows);
	});
})

app.post('/allNewsComments', function(req, res) {

	console.log('/post allNewsComments')

	newsComments.createComment(req.body.parentcomment, req.body.comment,
			req.body.fk_post, req.body.fk_user, 'Y', function(err, rows) {

				// ok
				newsComments.getAllComments(req.body.fk_post, function(err,
						rows) {
					res.send(rows);
				});
			});

})

app.post('/confirmedNewsComments', function(req, res) {

	console.log('/confirmedNewsComments')

	newsComments.createComment(req.body.parentcomment, req.body.comment,
			req.body.fk_post, req.body.fk_user, 'N', function(err, rows) {

				// ok
				comments.getConfirmedComments(req.body.fk_post, function(err,
						rows) {

					var util = require('util');

					console.log(util.inspect(rows, {
						showHidden : true,
						depth : null
					}));

					res.send(rows);
				});
			});

})

var schedules = require('./db/schedules');

app.get('/schedules', function(req, res) {
	console.log('schedules')
	schedules.getAll(function(err, rows) {
		res.send(rows);
	});
})

app.post('/schedule', function(req, res) {

	console.log('/schedule')

	schedules.createSchedule(req.body.title, function(err, rows) {
		res.send('OK');
	});

})

app.post('/deleteSchedule', function(req, res) {

	console.log('/deleteSchedule')

	schedules.deleteSchedule(req.body.id, function(err, rows) {
		res.send('OK');
	});

})

app.put('/schedule', function(req, res) {

	console.log('/schedule')

	schedules.updateSchedule(req.body.id, req.body.title, function(err, rows) {

		res.send('OK');
	});
})

// todo michal co jesli nic nie znaleziono? send error
app.get('/schedule', function(req, res) {
	console.log('/schedule')

	schedules.getSchedule(req.query.id, function(err, rows) {

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

var events = require('./db/events');

app.get('/allevents', function(req, res) {
	console.log('allevents')
	events.getAll(function(err, rows) {
		res.send(rows);
	});
})

app.get('/events', function(req, res) {
	console.log('events')
	events.getEvents(req.query.fk_schedule, function(err, rows) {
		res.send(rows);
	});
})

app.post('/event', function(req, res) {

	console.log('/event')

	events.createEvent(req.body.from_date, req.body.to_date,
			req.body.fk_schedule, req.body.title, req.body.description,
			function(err, rows) {
				res.send('OK');
			});

})

app.post('/deleteEvent', function(req, res) {

	console.log('/deleteSchedule')

	schedules.deleteSchedule(req.body.id, function(err, rows) {
		res.send('OK');
	});

})

app.put('/event', function(req, res) {

	console.log('/event')

	events.updateEvent(req.body.id, req.body.from_date, req.body.to_date,
			req.body.fk_schedule, req.body.title, req.body.description,
			function(err, rows) {
				res.send('OK');
			});
})

// todo michal co jesli nic nie znaleziono? send error
app.get('/event', function(req, res) {
	console.log('/event')

	events.getEvent(req.query.id, function(err, rows) {

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

app.post('/adminMessages', function(req, res) {

	console.log('/adminMessages')

	// TODO czy dodac do bazy?

	mailer.sendAdminMessages(req.body.name, req.body.email, req.body.subject,
			req.body.message);

	res.send('OK');
})

// todo rozpoznawanie rozszerzenia jpg/png itp
app.get('/profileimage', function(req, res) {
	console.log('/profileimage')
	console.log('req.query.id=' + req.query.id)

	// req.params.id
	res.sendFile(req.query.id + '.jpg', {
		root : './images/user',
		headers : {
			'Content-Type' : 'image/jpeg'
		}
	}, function(err) {
		if (err) {
			console.log('err')
			// res error not found
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