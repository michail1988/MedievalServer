var db = require('../db');


exports.getAll = function(done) {
	db
			.get()
			.query(
					'select fk_user, fk_workshop from MED_WORKSHOPS_USERS',
					function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
					})
}


exports.getForWorkshop = function(id, done) {

	var values = [ id ]
	db
			.get()
			.query(
					'select fk_user, fk_workshop from MED_WORKSHOPS_USERS where fk_workshop = ?',
					values, function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
					})
}

exports.getForUser = function(id, done) {

	var values = [ id ]
	db
			.get()
			.query(
					'select fk_user, fk_workshop from MED_WORKSHOPS_USERS where fk_user = ?',
					values, function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
					})
}

exports.deleteWorkshops = function(id, done) {

	var values = [ id ]
	db
			.get()
			.query(
					'delete from MED_WORKSHOPS_USERS where fk_user = ?',
					values, function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
					})
}

exports.insertWorkshop = function(fk_user, fk_workshop,
		done) {
	var values = [ fk_user, fk_workshop ]

	db
			.get()
			.query(
					'INSERT INTO MED_WORKSHOPS_USERS (fk_user, fk_workshop) VALUES(?, ?)',
					values, function(err, result) {
						if (err)
							return done(err)
						done(null, result)

						console.log('Pomyslny insert do tabeli MED_WORKSHOPS_USERS.')
					})
}