var db = require('../db');

// TODO koniecznie jakas odpowiedz
exports.createUser = function(req, done) {
	var values = [ req.body.name, req.body.surname, req.body.email,
			req.body.password, new Date(), req.body.university, req.body.phone,
			req.body.congressrole, req.body.subjectdescription,
			req.body.contactcomments, req.body.confirmation, '' ]

	db
			.get()
			.query(
					'insert into MED_USERS (NAME, SURNAME, EMAIL, PASSWORD, REGISTERDATE, UNIVERSITY, PHONE, CONGRESSROLE, SUBJECTDESCRIPTION, '
							+ 'CONTACTCOMMENTS, CONFIRMATION, PRIVILEGES) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
					values, function(err, result) {
						if (err)
							return done(err)
						done(null, result)

						console.log('Pomyslny insert do tabeli MED_USERS.')
					})
}

exports.getAll = function(done) {
	db
			.get()
			.query(
					'SELECT id, name, surname, email, password, registerdate, university, phone, congressrole, subjectdescription, '
							+ 'contactcomments, confirmation, privileges FROM MED_USERS',
					function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
						console.log('Users selected')
					})
}