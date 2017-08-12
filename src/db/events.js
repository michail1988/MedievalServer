var db = require('../db');

exports.getAll = function(done) {
	db
			.get()
			.query(
					'select id, from_date, to_date, fk_schedule, title, description from MED_EVENTS',
					function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
					})
}

exports.getEvents = function(fk_schedule, done) {
	var values = [ fk_schedule ]
	
	db
			.get()
			.query(
					'select id, from_date, to_date, fk_schedule, title, description from MED_EVENTS where fk_schedule = ?',
					values,
					function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
					})
}

exports.getEvent = function(id, done) {

	var values = [ id ]
	db
			.get()
			.query(
					'select id, from_date, to_date, fk_schedule, title, description from MED_EVENTS where id = ?',
					values, function(err, rows) {
						if (err)
							return done(err)
						done(null, rows)
					})
}

exports.createEvent = function(from_date, to_date, fk_schedule, title, description,
		done) {
	var values = [ from_date, to_date, fk_schedule, title, description ]

	db
			.get()
			.query(
					'INSERT INTO MED_EVENTS (from_date, to_date, fk_schedule, title, description) VALUES(?, ?, ?, ?, ?)',
					values, function(err, result) {
						if (err)
							return done(err)
						done(null, result)

						console.log('Pomyslny insert do tabeli MED_EVENTS.')
					})
}

exports.updateEvent = function(id, from_date, to_date, fk_schedule, title, description, done) {
	var values = [ from_date, to_date, fk_schedule, title, description, id ]

	db
			.get()
			.query(
					'UPDATE MED_EVENTS set from_date =?, to_date=?, fk_schedule=?, title=?, description=? where ID = ?',
					values, function(err, result) {
						if (err)
							return done(err)
						done(null, result)

						console.log('Pomyslny update do tabeli MED_EVENTS.')
					})
}

exports.deleteEvent = function(id, done) {
	var values = [ id ]

	db.get().query(
			'DELETE FROM MED_EVENTS where ID = ?',
			values, function(err, result) {
				if (err)
					return done(err)
				done(null, result)

				console.log('Usunieto z tabeli MED_EVENTS.')
			})
}